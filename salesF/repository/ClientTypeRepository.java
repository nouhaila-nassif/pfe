package com.example.sales.repository;

import com.example.sales.model.ClientType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientTypeRepository extends JpaRepository<ClientType, Long> {
    boolean existsByName(String name);
}
