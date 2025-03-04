package com.deepelectrocodingbackend.deepbackend.repository;

import com.deepelectrocodingbackend.deepbackend.entity.DeepCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DeepCategoryRepository extends JpaRepository<DeepCategory, Long> {

    // Méthode pour trouver une catégorie par son nom
    List<DeepCategory> findByName(String name);
}