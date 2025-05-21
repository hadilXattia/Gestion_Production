package com.production.controller;

import com.production.model.Maintenance;
import com.production.model.Machine;
import com.production.repository.MaintenanceRepository;
import com.production.repository.MachineRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/maintenances")
@CrossOrigin("*")
public class MaintenanceController {

    private final MaintenanceRepository repository;
    private final MachineRepository machineRepository;

    public MaintenanceController(MaintenanceRepository repository, MachineRepository machineRepository) {
        this.repository = repository;
        this.machineRepository = machineRepository;
    }

    // Accessible par ADMIN & TECHNICIEN
    @PreAuthorize("hasAnyRole('ADMIN', 'TECHNICIEN')")
    @GetMapping
    public List<Maintenance> getAll() {
        return repository.findAll();
    }

    // Seulement ADMIN peut créer une maintenance
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public Maintenance create(@RequestBody Maintenance maintenance) {
        Maintenance saved = repository.save(maintenance);
        updateMachineNextMaintenance(saved.getMachine().getId());
        return saved;
    }

    // Seulement ADMIN peut modifier une maintenance
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public Maintenance update(@PathVariable Long id, @RequestBody Maintenance maintenance) {
        maintenance.setId(id);
        Maintenance updated = repository.save(maintenance);
        updateMachineNextMaintenance(updated.getMachine().getId());
        return updated;
    }

    // Seulement ADMIN peut supprimer une maintenance
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        Maintenance m = repository.findById(id).orElse(null);
        if (m != null) {
            Long machineId = m.getMachine().getId();
            repository.deleteById(id);
            updateMachineNextMaintenance(machineId);
        }
    }

    // Accessible par ADMIN & TECHNICIEN
    @PreAuthorize("hasAnyRole('ADMIN', 'TECHNICIEN')")
    @GetMapping("/planifiee")
    public List<Maintenance> getPlannedMaintenance() {
        return repository.findAll().stream()
                .filter(m -> m.getDate() != null && m.getDate().isAfter(LocalDate.now()))
                .collect(Collectors.toList());
    }

    private void updateMachineNextMaintenance(Long machineId) {
        List<Maintenance> maintenances = repository.findAll().stream()
                .filter(m -> m.getDate() != null && m.getMachine() != null && m.getMachine().getId().equals(machineId))
                .filter(m -> m.getDate().isAfter(LocalDate.now()))
                .sorted((m1, m2) -> m1.getDate().compareTo(m2.getDate()))
                .toList();

        Machine machine = machineRepository.findById(machineId).orElse(null);
        if (machine != null) {
            if (!maintenances.isEmpty()) {
                machine.setMaintenanceProchaine(maintenances.get(0).getDate());
            } else {
                machine.setMaintenanceProchaine(null);
            }
            machineRepository.save(machine);
        }
    }
}
