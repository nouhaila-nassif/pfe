package com.example.sales.service;

import com.example.sales.model.Route;
import com.example.sales.repository.RouteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RouteService {

    @Autowired
    private RouteRepository routeRepository;

    public Route createRoute(Route route) {
        return routeRepository.save(route);
    }

    public List<Route> getAllRoutes() {
        return routeRepository.findAll();
    }



    public void deleteRoute(Long id) {
        routeRepository.deleteById(id);
    }
}
