package com.production.controller;

import com.production.model.Maintenance;
import com.production.repository.MaintenanceRepository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/maintenances")
@CrossOrigin("*")
public class MaintenanceController {

    private final MaintenanceRepository repository;

    public MaintenanceController(MaintenanceRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Maintenance> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public Maintenance create(@RequestBody Maintenance maintenance) {
        return repository.save(maintenance);
    }

    @PutMapping("/{id}")
    public Maintenance update(@PathVariable Long id, @RequestBody Maintenance maintenance) {
        maintenance.setId(id);
        return repository.save(maintenance);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repository.deleteById(id);
    }
    //end crud
    @GetMapping("/planifiee")
    public List<Maintenance> getPlannedMaintenance() {
        return repository.findAll().stream()
                .filter(m -> m.getDate().isAfter(LocalDate.now()))
                .collect(Collectors.toList());
    }
}
