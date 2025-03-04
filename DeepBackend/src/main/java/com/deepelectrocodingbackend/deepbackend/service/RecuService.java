package com.deepelectrocodingbackend.deepbackend.service;

import com.deepelectrocodingbackend.deepbackend.entity.Recu;
import com.deepelectrocodingbackend.deepbackend.repository.RecuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class RecuService {

    @Autowired
    private RecuRepository recuRepository;

    // Créer un nouveau reçu
    public Recu createRecu(Recu recu) {
        return recuRepository.save(recu);
    }

    // Récupérer tous les reçus
    public List<Recu> getAllRecus() {
        return recuRepository.findAll();
    }

    // Récupérer un reçu par ID
    public Optional<Recu> getRecuById(Long id) {
        return recuRepository.findById(id);
    }

    // Mettre à jour un reçu
    public Recu updateRecu(Long id, Recu recuDetails) {
        Recu recu = recuRepository.findById(id).orElseThrow(() -> new RuntimeException("Recu not found"));
        recu.setMontant(recuDetails.getMontant());
        recu.setDate(recuDetails.getDate());
        recu.setDescription(recuDetails.getDescription());
        return recuRepository.save(recu);
    }

    // Supprimer un reçu
    public void deleteRecu(Long id) {
        recuRepository.deleteById(id);
    }

    // Récupérer les reçus par montant
    public List<Recu> getRecusByMontant(double montant) {
        return recuRepository.findByMontant(montant);
    }

    // Récupérer les reçus par description
    public List<Recu> getRecusByDescription(String description) {
        return recuRepository.findByDescriptionContaining(description);
    }

    // Récupérer les reçus par date
    public List<Recu> getRecusByDateBetween(Date startDate, Date endDate) {
        return recuRepository.findByDateBetween(startDate, endDate);
    }
}