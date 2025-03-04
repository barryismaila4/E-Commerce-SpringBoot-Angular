package com.deepelectrocodingbackend.deepbackend.controller;

import com.deepelectrocodingbackend.deepbackend.entity.DeepCategory;
import com.deepelectrocodingbackend.deepbackend.service.DeepCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/categories")
public class DeepCategoryController {

    @Autowired
    private DeepCategoryService categoryService;

    // Lister toutes les catégories
    @GetMapping
    public List<DeepCategory> getAllCategories() {
        return categoryService.findAll();
    }

    // Ajouter une nouvelle catégorie
    @PostMapping
    public ResponseEntity<DeepCategory> createCategory(@RequestBody DeepCategory category) {
        DeepCategory savedCategory = categoryService.save(category);
        return new ResponseEntity<>(savedCategory, HttpStatus.CREATED);
    }

    // Modifier une catégorie
    @PutMapping("/{id}")
    public ResponseEntity<DeepCategory> updateCategory(@PathVariable Long id, @RequestBody DeepCategory categoryDetails) {
        DeepCategory updatedCategory = categoryService.update(id, categoryDetails);
        if (updatedCategory != null) {
            return new ResponseEntity<>(updatedCategory, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Supprimer une catégorie
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
        categoryService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // Trouver une catégorie par Id
    @GetMapping("/{id}")
    public ResponseEntity<DeepCategory> getCategoryById(@PathVariable Long id) {
        Optional<DeepCategory> category = categoryService.findById(id);
        return category.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // Trouver une catégorie par son nom
    @GetMapping("/search")
    public ResponseEntity<List<DeepCategory>> getCategoryByName(@RequestParam String name) {
        List<DeepCategory> categories = categoryService.findByName(name);
        if (!categories.isEmpty()) {
            return new ResponseEntity<>(categories, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
