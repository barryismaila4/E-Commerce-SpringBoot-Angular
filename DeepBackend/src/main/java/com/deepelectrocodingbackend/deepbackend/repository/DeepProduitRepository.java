package com.deepelectrocodingbackend.deepbackend.repository;

import com.deepelectrocodingbackend.deepbackend.entity.DeepProduit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DeepProduitRepository extends JpaRepository<DeepProduit, Long> {
    List<DeepProduit> findByName(String name);
    List<DeepProduit> findByCategoryId(Long categoryId);
    Optional<DeepProduit> findByCode(String code);  // Méthode ajoutée pour trouver un produit par son code
}
