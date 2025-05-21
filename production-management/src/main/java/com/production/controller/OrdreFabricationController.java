package com.production.controller;

import com.production.model.OrdreFabrication;
import com.production.model.Produit;
import com.production.repository.OrdreFabricationRepository;
import com.production.repository.ProduitRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ordres")
@CrossOrigin("*")
public class OrdreFabricationController {

    private final OrdreFabricationRepository repository;
    private final ProduitRepository produitRepository;

    public OrdreFabricationController(OrdreFabricationRepository repository, ProduitRepository produitRepository) {
        this.repository = repository;
        this.produitRepository = produitRepository;
    }

    // Accessible par ADMIN & TECHNICIEN
    @PreAuthorize("hasAnyRole('ADMIN', 'TECHNICIEN')")
    @GetMapping
    public List<OrdreFabrication> getAll() {
        return repository.findAll();
    }

    // Seulement ADMIN peut créer un ordre
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public OrdreFabrication create(@RequestBody OrdreFabrication ordre) {
        Produit produit = produitRepository.findById(ordre.getProduit().getId())
                .orElseThrow(() -> new RuntimeException("Produit introuvable"));

        // Ajout automatique de la quantité au stock produit
        produit.setStock(produit.getStock() + ordre.getQuantite());
        produitRepository.save(produit);

        return repository.save(ordre);
    }

    // Seulement ADMIN peut modifier un ordre
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public OrdreFabrication update(@PathVariable Long id, @RequestBody OrdreFabrication ordre) {
        ordre.setId(id);

        OrdreFabrication ancienOrdre = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ordre introuvable"));

        Produit produit = produitRepository.findById(ordre.getProduit().getId())
                .orElseThrow(() -> new RuntimeException("Produit introuvable"));

        // Ajustement du stock selon la différence de quantité
        int difference = ordre.getQuantite() - ancienOrdre.getQuantite();
        produit.setStock(produit.getStock() + difference);
        produitRepository.save(produit);

        return repository.save(ordre);
    }

    // Seulement ADMIN peut supprimer un ordre
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        OrdreFabrication ordre = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ordre introuvable"));

        Produit produit = produitRepository.findById(ordre.getProduit().getId())
                .orElseThrow(() -> new RuntimeException("Produit introuvable"));

        // On retire la quantité de l'ordre du stock produit
        produit.setStock(produit.getStock() - ordre.getQuantite());
        produitRepository.save(produit);

        repository.deleteById(id);
    }

    // Accessible par ADMIN & TECHNICIEN
    @PreAuthorize("hasAnyRole('ADMIN', 'TECHNICIEN')")
    @GetMapping("/statut/{statut}")
    public List<OrdreFabrication> getByStatut(@PathVariable String statut) {
        return repository.findByStatut(statut);
    }

    // Seulement ADMIN peut modifier le statut
    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("/{id}/statut")
    public OrdreFabrication updateStatut(@PathVariable Long id, @RequestBody String statut) {
        OrdreFabrication ordre = repository.findById(id).orElseThrow();

        Produit produit = produitRepository.findById(ordre.getProduit().getId())
                .orElseThrow(() -> new RuntimeException("Produit introuvable"));

        String statutNettoye = statut.replace("\"", "").trim();

        if ("Terminé".equalsIgnoreCase(statutNettoye) && !"Terminé".equalsIgnoreCase(ordre.getStatut())) {
            produit.setStock(produit.getStock() + ordre.getQuantite());
            produitRepository.save(produit);
        }

        ordre.setStatut(statutNettoye);
        return repository.save(ordre);
    }
}
