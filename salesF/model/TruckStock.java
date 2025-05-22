package com.example.sales.model;

import jakarta.persistence.*;


@Entity
public class TruckStock {
    @Id @GeneratedValue
    private Long id;
    private int quantity;

    @ManyToOne(optional = false)
    private Seller seller;

    @ManyToOne(optional = false)
    private Product product;

    // Getters & Setters
}