package com.production.controller;

import com.production.model.Machine;
import com.production.model.Maintenance;
import com.production.model.Technicien;
import com.production.repository.MachineRepository;
import com.production.repository.MaintenanceRepository;
import com.production.repository.TechnicienRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
@RestController
@RequestMapping("/api/machines")
@CrossOrigin("*")
public class MachineController {

    private final MachineRepository repository;
    private final MaintenanceRepository maintenanceRepository;
    private final TechnicienRepository technicienRepository;

    public MachineController(MachineRepository repository, MaintenanceRepository maintenanceRepository, TechnicienRepository technicienRepository) {
        this.repository = repository;
        this.maintenanceRepository = maintenanceRepository;
        this.technicienRepository = technicienRepository;
    }

    // ✅ Accessible par tous les utilisateurs connectés (ADMIN & TECHNICIEN)
    @PreAuthorize("hasAnyRole('ADMIN', 'TECHNICIEN')")
    @GetMapping
    public List<Machine> getAll() {
        return repository.findAll();
    }

    // ✅ Seulement les ADMIN peuvent créer une machine
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public Machine create(@RequestBody Machine machine) {
        return repository.save(machine);
    }

    // ✅ Seulement les ADMIN peuvent modifier une machine
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public Machine update(@PathVariable Long id, @RequestBody Machine updatedMachine) {
        Machine existingMachine = repository.findById(id).orElse(null);
        if (existingMachine == null) {
            return null;
        }

        String oldEtat = existingMachine.getEtat() != null ? existingMachine.getEtat().trim().toLowerCase() : "";
        String newEtat = updatedMachine.getEtat() != null ? updatedMachine.getEtat().trim().toLowerCase() : "";

        boolean etatChangedToPanne = !"en panne".equals(oldEtat) && "en panne".equals(newEtat);
        boolean etatChangedToMaintenance = !"en maintenance".equals(oldEtat) && "en maintenance".equals(newEtat);

        if (etatChangedToPanne || etatChangedToMaintenance) {
            Maintenance maintenance = new Maintenance();
            maintenance.setMachine(existingMachine);
            maintenance.setDate(LocalDate.now());
            maintenance.setType(etatChangedToPanne ? "Panne automatique" : "Maintenance automatique");

            Technicien technicienAssigne = technicienRepository.findByMachineAssignee(existingMachine);
            maintenance.setTechnicien(technicienAssigne);

            maintenanceRepository.save(maintenance);
        }

        if (etatChangedToMaintenance) {
            existingMachine.setMaintenanceProchaine(LocalDate.now());
        }

        existingMachine.setNom(updatedMachine.getNom());
        existingMachine.setEtat(updatedMachine.getEtat());

        if (!etatChangedToMaintenance) {
            existingMachine.setMaintenanceProchaine(updatedMachine.getMaintenanceProchaine());
        }

        return repository.save(existingMachine);
    }

    // ✅ Seulement les ADMIN peuvent supprimer une machine
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repository.deleteById(id);
    }

}