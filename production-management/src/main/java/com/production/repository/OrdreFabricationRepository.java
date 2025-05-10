package com.production.repository;

import com.production.model.OrdreFabrication;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrdreFabricationRepository extends JpaRepository<OrdreFabrication, Long> {
    List<OrdreFabrication> findByStatut(String statut);
}
