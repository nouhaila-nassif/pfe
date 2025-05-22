package com.example.sales.repository;

import com.example.sales.model.TruckStock;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TruckStockRepository extends JpaRepository<TruckStock, Long> {
}
