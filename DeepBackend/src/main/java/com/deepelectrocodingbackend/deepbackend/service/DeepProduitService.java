package com.deepelectrocodingbackend.deepbackend.service;

import com.deepelectrocodingbackend.deepbackend.entity.DeepProduit;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface DeepProduitService {

    DeepProduit saveProduit(DeepProduit produit, MultipartFile imageFile) throws IOException;

    Optional<DeepProduit> getProduitById(Long id);

    List<DeepProduit> getAllProduits();

    // Ajout des nouvelles méthodes de recherche
    List<DeepProduit> findProduitsByName(String name);

    List<DeepProduit> findProduitsByCategoryId(Long categoryId);

    // Recherche par code
    Optional<DeepProduit> findProduitByCode(String code);  // Méthode ajoutée pour trouver un produit par son code

    DeepProduit updateProduit(Long id, DeepProduit produitDetails, MultipartFile imageFile) throws IOException;

    void deleteProduit(Long id);
}
