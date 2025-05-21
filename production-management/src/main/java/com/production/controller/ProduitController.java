package com.production.controller;

import com.production.model.Produit;
import com.production.repository.OrdreFabricationRepository;
import com.production.repository.ProduitRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/produits")
@CrossOrigin("*")
public class ProduitController {

    private final ProduitRepository repository;
    private final OrdreFabricationRepository ordreFabricationRepository;

    public ProduitController(ProduitRepository repository, OrdreFabricationRepository ordreFabricationRepository) {
        this.repository = repository;
        this.ordreFabricationRepository = ordreFabricationRepository;
    }

    // Accessible par ADMIN & TECHNICIEN
    @PreAuthorize("hasAnyRole('ADMIN', 'TECHNICIEN')")
    @GetMapping
    public List<Produit> getAll() {
        return repository.findAll();
    }

    // Seulement ADMIN peut créer un produit
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public Produit create(@RequestBody Produit produit) {
        return repository.save(produit);
    }

    // Seulement ADMIN peut modifier un produit
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public Produit update(@PathVariable Long id, @RequestBody Produit produit) {
        produit.setId(id);
        return repository.save(produit);
    }

    // Seulement ADMIN peut supprimer un produit
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        // Supprimer d'abord les ordres liés
        ordreFabricationRepository.deleteByProduitId(id);
        // Puis supprimer le produit
        repository.deleteById(id);
    }
}
