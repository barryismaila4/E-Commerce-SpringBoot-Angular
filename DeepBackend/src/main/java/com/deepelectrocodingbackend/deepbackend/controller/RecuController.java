package com.deepelectrocodingbackend.deepbackend.controller;

import com.deepelectrocodingbackend.deepbackend.entity.Recu;
import com.deepelectrocodingbackend.deepbackend.service.RecuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/recus")
@CrossOrigin(origins = "http://localhost:4200") // Autoriser les requêtes CORS depuis Angular
public class RecuController {

    @Autowired
    private RecuService recuService;

    // Créer un nouveau reçu
    @PostMapping
    public ResponseEntity<Recu> createRecu(@RequestBody Recu recu) {
        Recu createdRecu = recuService.createRecu(recu);
        return ResponseEntity.ok(createdRecu);
    }

    // Récupérer tous les reçus
    @GetMapping
    public List<Recu> getAllRecus() {
        return recuService.getAllRecus();
    }

    // Récupérer un reçu par ID
    @GetMapping("/{id}")
    public ResponseEntity<Recu> getRecuById(@PathVariable Long id) {
        Optional<Recu> recu = recuService.getRecuById(id);
        return recu.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Mettre à jour un reçu
    @PutMapping("/{id}")
    public ResponseEntity<Recu> updateRecu(@PathVariable Long id, @RequestBody Recu recuDetails) {
        Recu updatedRecu = recuService.updateRecu(id, recuDetails);
        return ResponseEntity.ok(updatedRecu);
    }

    // Supprimer un reçu
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRecu(@PathVariable Long id) {
        recuService.deleteRecu(id);
        return ResponseEntity.noContent().build();
    }

    // Récupérer les reçus par montant
    @GetMapping("/montant/{montant}")
    public List<Recu> getRecusByMontant(@PathVariable double montant) {
        return recuService.getRecusByMontant(montant);
    }

    // Récupérer les reçus par description
    @GetMapping("/description/{description}")
    public List<Recu> getRecusByDescription(@PathVariable String description) {
        return recuService.getRecusByDescription(description);
    }

    // Récupérer les reçus par date
    @GetMapping("/date")
    public List<Recu> getRecusByDateBetween(@RequestParam Date startDate, @RequestParam Date endDate) {
        return recuService.getRecusByDateBetween(startDate, endDate);
    }
}