package com.production.controller;

import com.production.model.Machine;
import com.production.model.Technicien;
import com.production.repository.MachineRepository;
import com.production.repository.TechnicienRepository;
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

    @GetMapping
    public List<Technicien> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public Technicien create(@RequestBody Technicien technicien) {
        return repository.save(technicien);
    }

    @PutMapping("/{id}")
    public Technicien update(@PathVariable Long id, @RequestBody Technicien technicien) {
        technicien.setId(id);
        return repository.save(technicien);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repository.deleteById(id);
    }

    // Assign a machine to a technician
    @PatchMapping("/{id}/assigner-machine/{machineId}")
    public Technicien assignMachine(@PathVariable Long id, @PathVariable Long machineId) {
        Technicien tech = repository.findById(id).orElseThrow();
        Machine machine = machineRepository.findById(machineId).orElseThrow();
        tech.setMachineAssignee(machine);
        return repository.save(tech);
    }
}
