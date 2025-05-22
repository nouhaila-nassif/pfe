package com.example.sales.model;

import jakarta.persistence.*;

import java.util.List;
import java.util.Set;@Entity
public class Route {
    @Id @GeneratedValue
    private Long id;
    private String name;

    @ManyToMany(mappedBy = "assignedRoutes")
    private List<Seller> sellers;

    public Route(Long id) {
        this.id = id;
    }

    public Route() {

    }
// Getters & Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}

