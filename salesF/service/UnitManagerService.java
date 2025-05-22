package com.example.sales.service;

import com.example.sales.model.Route;
import com.example.sales.model.TruckStock;
import com.example.sales.repository.RouteRepository;
import com.example.sales.repository.TruckStockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UnitManagerService {

    @Autowired
    private RouteRepository routeRepository;



    public void validatePerformance(Long userId) {
        // Logique de validation sur les commandes/visites
    }
}
