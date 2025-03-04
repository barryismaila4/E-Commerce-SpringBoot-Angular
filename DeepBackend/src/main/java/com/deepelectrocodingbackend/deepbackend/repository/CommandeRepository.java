package com.deepelectrocodingbackend.deepbackend.repository;

import com.deepelectrocodingbackend.deepbackend.entity.Commande;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommandeRepository extends JpaRepository<Commande, Long> {

    // Ici tu peux ajouter des méthodes personnalisées si nécessaire
    // Par exemple, pour récupérer une commande par son email :
    // Commande findByEmail(String email);

}
