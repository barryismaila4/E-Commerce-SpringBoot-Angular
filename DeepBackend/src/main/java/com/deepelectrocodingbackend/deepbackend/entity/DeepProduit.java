package com.deepelectrocodingbackend.deepbackend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "deep_produit")
public class DeepProduit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(length = 500)
    private String description;

    @Column(nullable = false)
    private Double prix;

    @Lob
    private byte[] image;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    @JsonBackReference
    private DeepCategory category;

    @Column(nullable = false, unique = true)
    private String code;  // Nouvel attribut code ajouté

    // Constructeur sans argument
    public DeepProduit() {
    }

    // Constructeur avec tous les arguments
    public DeepProduit(Long id, String name, String description, Double prix, byte[] image, DeepCategory category, String code) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.prix = prix;
        this.image = image;
        this.category = category;
        this.code = code;  // Initialisation du code
    }

    // Getters et Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrix() {
        return prix;
    }

    public void setPrix(Double prix) {
        this.prix = prix;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public DeepCategory getCategory() {
        return category;
    }

    public void setCategory(DeepCategory category) {
        this.category = category;
    }

    public String getCode() {
        return code;  // Getter pour code
    }

    public void setCode(String code) {
        this.code = code;  // Setter pour code
    }

    // Ajouter une méthode pour valider le code, si nécessaire
    public boolean isCodeValid() {
        return code != null && !code.trim().isEmpty();
    }
}
