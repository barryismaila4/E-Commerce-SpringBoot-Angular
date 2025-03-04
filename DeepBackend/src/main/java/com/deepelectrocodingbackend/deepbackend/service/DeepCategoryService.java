package com.deepelectrocodingbackend.deepbackend.service;

import com.deepelectrocodingbackend.deepbackend.entity.DeepCategory;
import com.deepelectrocodingbackend.deepbackend.repository.DeepCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DeepCategoryService {

    @Autowired
    private DeepCategoryRepository categoryRepository;

    // Lister toutes les catégories
    public List<DeepCategory> findAll() {
        return categoryRepository.findAll();
    }

    // Ajouter une nouvelle catégorie
    public DeepCategory save(DeepCategory category) {
        return categoryRepository.save(category);
    }

    // Modifier une catégorie existante
    public DeepCategory update(Long id, DeepCategory categoryDetails) {
        Optional<DeepCategory> optionalCategory = categoryRepository.findById(id);
        if (optionalCategory.isPresent()) {
            DeepCategory category = optionalCategory.get();
            category.setName(categoryDetails.getName());
            // Mettez à jour d'autres champs si nécessaire
            return categoryRepository.save(category);
        } else {
            // Gérer le cas où la catégorie n'existe pas
            return null;
        }
    }

    // Supprimer une catégorie par Id
    public void delete(Long id) {
        categoryRepository.deleteById(id);
    }

    // Trouver une catégorie par Id
    public Optional<DeepCategory> findById(Long id) {
        return categoryRepository.findById(id);
    }
    // Trouver une catégorie par son nom
    public List<DeepCategory> findByName(String name) {
        return categoryRepository.findByName(name);
    }
}