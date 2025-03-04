package com.deepelectrocodingbackend.deepbackend.repository;

import com.deepelectrocodingbackend.deepbackend.entity.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {
}
