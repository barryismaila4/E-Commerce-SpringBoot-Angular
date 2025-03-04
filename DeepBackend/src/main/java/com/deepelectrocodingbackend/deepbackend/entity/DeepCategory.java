package com.deepelectrocodingbackend.deepbackend.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name = "deep_category")
public class DeepCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference // Indique que c'est la partie 'parent' de la relation
    private Set<DeepProduit> produits;

    // Constructeur sans argument
    public DeepCategory() {
    }

    // Constructeur avec tous les arguments
    public DeepCategory(Long id, String name, Set<DeepProduit> produits) {
        this.id = id;
        this.name = name;
        this.produits = produits;
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

    public Set<DeepProduit> getProduits() {
        return produits;
    }

    public void setProduits(Set<DeepProduit> produits) {
        this.produits = produits;
    }
}
