package com.deepelectrocodingbackend.deepbackend.service.impl;

import com.deepelectrocodingbackend.deepbackend.entity.DeepProduit;
import com.deepelectrocodingbackend.deepbackend.repository.DeepProduitRepository;
import com.deepelectrocodingbackend.deepbackend.service.DeepProduitService;
import com.deepelectrocodingbackend.deepbackend.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class DeepProduitServiceImpl implements DeepProduitService {

    @Autowired
    private DeepProduitRepository produitRepository;

    @Autowired
    private ImageService imageService;

    @Override
    public DeepProduit saveProduit(DeepProduit produit, MultipartFile imageFile) throws IOException {
        // Validation du code
        if (produit.getCode() == null || produit.getCode().trim().isEmpty()) {
            throw new RuntimeException("Le code du produit ne peut pas être nul ou vide.");
        }

        if (imageFile != null && !imageFile.isEmpty()) {
            byte[] compressedImage = imageService.compressImage(imageFile);
            produit.setImage(compressedImage);
        }

        if (produit.getCategory() == null) {
            throw new RuntimeException("Category must not be null");
        }

        return produitRepository.save(produit);
    }

    @Override
    public Optional<DeepProduit> getProduitById(Long id) {
        return produitRepository.findById(id);
    }

    @Override
    public List<DeepProduit> getAllProduits() {
        return produitRepository.findAll();
    }

    @Override
    public List<DeepProduit> findProduitsByName(String name) {
        return produitRepository.findByName(name);
    }

    @Override
    public List<DeepProduit> findProduitsByCategoryId(Long categoryId) {
        return produitRepository.findByCategoryId(categoryId);
    }

    @Override
    public DeepProduit updateProduit(Long id, DeepProduit produitDetails, MultipartFile imageFile) throws IOException {
        DeepProduit produit = produitRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produit not found with id: " + id));

        // Validation du code
        if (produitDetails.getCode() == null || produitDetails.getCode().trim().isEmpty()) {
            throw new RuntimeException("Le code du produit ne peut pas être nul ou vide.");
        }

        produit.setName(produitDetails.getName());
        produit.setDescription(produitDetails.getDescription());
        produit.setPrix(produitDetails.getPrix());
        produit.setCategory(produitDetails.getCategory());
        produit.setCode(produitDetails.getCode());  // Mise à jour du code

        if (imageFile != null && !imageFile.isEmpty()) {
            byte[] compressedImage = imageService.compressImage(imageFile);
            produit.setImage(compressedImage);
        }

        return produitRepository.save(produit);
    }

    @Override
    public void deleteProduit(Long id) {
        produitRepository.deleteById(id);
    }

    @Override
    public Optional<DeepProduit> findProduitByCode(String code) {
        return produitRepository.findByCode(code);  // Appelle la méthode repository pour chercher par code
    }
}
