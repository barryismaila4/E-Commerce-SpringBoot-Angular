package com.deepelectrocodingbackend.deepbackend.service;

import com.deepelectrocodingbackend.deepbackend.entity.Commande;
import com.deepelectrocodingbackend.deepbackend.repository.CommandeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommandeService {

    @Autowired
    private CommandeRepository commandeRepository;

    // Méthode pour créer une nouvelle commande
    public Commande createCommande(Commande commande) {
        return commandeRepository.save(commande);
    }

    // Méthode pour récupérer toutes les commandes
    public List<Commande> getAllCommandes() {
        return commandeRepository.findAll();
    }

    // Méthode pour récupérer une commande par ID
    public Commande getCommandeById(Long id) {
        return commandeRepository.findById(id).orElse(null);
    }

    // Méthode pour supprimer une commande
    public void deleteCommande(Long id) {
        commandeRepository.deleteById(id);
    }
}