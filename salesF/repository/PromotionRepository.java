package com.example.sales.repository;

import com.example.sales.model.Promotion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PromotionRepository extends JpaRepository<Promotion, Long> {

    // Retourne toutes les promotions liées à un produit donné
    List<Promotion> findByProductId(Long productId);

}
