package com.production.controller;

import com.production.model.OrdreFabrication;
import com.production.repository.OrdreFabricationRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ordres")
@CrossOrigin("*")
public class OrdreFabricationController {

    private final OrdreFabricationRepository repository;

    public OrdreFabricationController(OrdreFabricationRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<OrdreFabrication> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public OrdreFabrication create(@RequestBody OrdreFabrication ordre) {
        return repository.save(ordre);
    }

    @PutMapping("/{id}")
    public OrdreFabrication update(@PathVariable Long id, @RequestBody OrdreFabrication ordre) {
        ordre.setId(id);
        return repository.save(ordre);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repository.deleteById(id);
    }
    //end of CRUD
    @GetMapping("/statut/{statut}")
    public List<OrdreFabrication> getByStatut(@PathVariable String statut) {
        return repository.findByStatut(statut);
    }

    @PatchMapping("/{id}/statut")
    public OrdreFabrication updateStatut(@PathVariable Long id, @RequestBody String statut) {
        OrdreFabrication ordre = repository.findById(id).orElseThrow();
        ordre.setStatut(statut);
        return repository.save(ordre);
    }
}
