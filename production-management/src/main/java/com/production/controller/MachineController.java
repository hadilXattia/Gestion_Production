package com.production.controller;

import com.production.model.Machine;
import com.production.repository.MachineRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/machines")
@CrossOrigin("*")
public class MachineController {

    private final MachineRepository repository;

    public MachineController(MachineRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Machine> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public Machine create(@RequestBody Machine machine) {
        return repository.save(machine);
    }

    @PutMapping("/{id}")
    public Machine update(@PathVariable Long id, @RequestBody Machine machine) {
        machine.setId(id);
        return repository.save(machine);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repository.deleteById(id);
    }

}
