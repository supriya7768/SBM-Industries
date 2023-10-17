package com.design.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.design.model.Registration;

@Repository
public interface RegistrationRepository extends JpaRepository<Registration, Long> {

	Optional<Registration> findByEmail(String email);
	
	Optional<Registration> findByName(String name);
	
	Optional<Registration> findByMobile(Long mobile);
	
	
}
