package com.deepelectrocodingbackend.deepbackend.repository;

import com.deepelectrocodingbackend.deepbackend.entity.Recu;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
@Transactional
public interface RecuRepository extends JpaRepository<Recu, Long> {

    // Méthode pour récupérer les reçus par montant
    List<Recu> findByMontant(double montant);

    // Méthode pour récupérer les reçus par description
    List<Recu> findByDescriptionContaining(String description);

    // Méthode pour récupérer les reçus par date
    List<Recu> findByDateBetween(Date startDate, Date endDate);
}
