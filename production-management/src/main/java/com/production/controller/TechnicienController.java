package com.production.controller;

import com.production.model.Machine;
import com.production.model.Technicien;
import com.production.repository.MachineRepository;
import com.production.repository.TechnicienRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/techniciens")
@CrossOrigin("*")
public class TechnicienController {

    private final TechnicienRepository repository;
    private final MachineRepository machineRepository;

    public TechnicienController(TechnicienRepository repository, MachineRepository machineRepository) {
        this.repository = repository;
        this.machineRepository = machineRepository;
    }

    // Accessible par ADMIN & TECHNICIEN
    @PreAuthorize("hasAnyRole('ADMIN', 'TECHNICIEN')")
    @GetMapping
    public List<Technicien> getAll() {
        return repository.findAll();
    }

    // Seulement ADMIN peut créer un technicien
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public Technicien create(@RequestBody Technicien technicien) {
        return repository.save(technicien);
    }

    // Seulement ADMIN peut modifier un technicien
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public Technicien update(@PathVariable Long id, @RequestBody Technicien technicien) {
        technicien.setId(id);
        return repository.save(technicien);
    }

    // Seulement ADMIN peut supprimer un technicien
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repository.deleteById(id);
    }

    // Seulement ADMIN peut assigner une machine à un technicien
    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("/{id}/assigner-machine/{machineId}")
    public Technicien assignMachine(@PathVariable Long id, @PathVariable Long machineId) {
        Technicien tech = repository.findById(id).orElseThrow();
        Machine machine = machineRepository.findById(machineId).orElseThrow();
        tech.setMachineAssignee(machine);
        return repository.save(tech);
    }
}
