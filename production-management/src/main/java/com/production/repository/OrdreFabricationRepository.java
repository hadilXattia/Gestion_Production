package com.production.repository;

import com.production.model.OrdreFabrication;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrdreFabricationRepository extends JpaRepository<OrdreFabrication, Long> {
    @Modifying
    @Transactional
    @Query("DELETE FROM OrdreFabrication o WHERE o.produit.id = :produitId")
    void deleteByProduitId(Long produitId);
    List<OrdreFabrication> findByStatut(String statut);
}

