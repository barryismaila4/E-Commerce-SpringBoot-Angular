package com.deepelectrocodingbackend.deepbackend.controller;

import com.deepelectrocodingbackend.deepbackend.entity.DeepCategory;
import com.deepelectrocodingbackend.deepbackend.entity.DeepProduit;
import com.deepelectrocodingbackend.deepbackend.service.DeepCategoryService;
import com.deepelectrocodingbackend.deepbackend.service.DeepProduitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/produits")
public class DeepProduitController {

    @Autowired
    private DeepProduitService produitService;

    @Autowired
    private DeepCategoryService categoryService;

    @PostMapping("/add")
    public ResponseEntity<DeepProduit> createProduit(
            @RequestParam("code") String code,  // Ajout du champ code
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("prix") Double prix,
            @RequestParam("categoryId") Long categoryId,
            @RequestParam(value = "image", required = false) MultipartFile imageFile) throws IOException {

        // Vérification si les champs essentiels sont présents
        if (name == null || name.trim().isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        if (description == null || description.trim().isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        if (prix == null || prix <= 0) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        // Création du produit
        DeepProduit produit = new DeepProduit();
        produit.setCode(code);  // Affectation du code
        produit.setName(name);
        produit.setDescription(description);
        produit.setPrix(prix);

        // Récupération et définition de la catégorie
        DeepCategory category = categoryService.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + categoryId));
        produit.setCategory(category);

        // Enregistrement du produit avec image (si présente)
        DeepProduit savedProduit = produitService.saveProduit(produit, imageFile);
        return new ResponseEntity<>(savedProduit, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DeepProduit> getProduitById(@PathVariable Long id) {
        Optional<DeepProduit> produit = produitService.getProduitById(id);
        return produit.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/all")
    public ResponseEntity<List<DeepProduit>> getAllProduits() {
        List<DeepProduit> produits = produitService.getAllProduits();
        return new ResponseEntity<>(produits, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<List<DeepProduit>> searchProduits(
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "categoryId", required = false) Long categoryId) {

        if (name != null && !name.isEmpty()) {
            List<DeepProduit> produitsByName = produitService.findProduitsByName(name);
            return new ResponseEntity<>(produitsByName, HttpStatus.OK);
        }

        if (categoryId != null) {
            List<DeepProduit> produitsByCategoryId = produitService.findProduitsByCategoryId(categoryId);
            return new ResponseEntity<>(produitsByCategoryId, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<DeepProduit> updateProduit(
            @PathVariable Long id,
            @RequestParam("code") String code,  // Ajout du champ code
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("prix") Double prix,
            @RequestParam("categoryId") Long categoryId,
            @RequestParam(value = "image", required = false) MultipartFile imageFile) throws IOException {

        // Vérification si les champs essentiels sont présents
        if (name == null || name.trim().isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        if (description == null || description.trim().isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        if (prix == null || prix <= 0) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        DeepProduit produitDetails = new DeepProduit();
        produitDetails.setCode(code);  // Affectation du code
        produitDetails.setName(name);
        produitDetails.setDescription(description);
        produitDetails.setPrix(prix);

        // Récupération et définition de la catégorie
        DeepCategory category = categoryService.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + categoryId));
        produitDetails.setCategory(category);

        // Mise à jour du produit
        DeepProduit updatedProduit = produitService.updateProduit(id, produitDetails, imageFile);
        return new ResponseEntity<>(updatedProduit, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteProduit(@PathVariable Long id) {
        produitService.deleteProduit(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/searchByCode")
    public ResponseEntity<DeepProduit> searchProduitByCode(@RequestParam("code") String code) {
        if (code == null || code.trim().isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Optional<DeepProduit> produit = produitService.findProduitByCode(code);
        return produit.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
