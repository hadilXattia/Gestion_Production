package com.production.repository;

import com.production.model.Machine;
import com.production.model.Technicien;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TechnicienRepository extends JpaRepository<Technicien, Long> {
    Technicien findByMachineAssignee(Machine machine);}
