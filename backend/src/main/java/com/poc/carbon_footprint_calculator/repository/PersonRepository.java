package com.poc.carbon_footprint_calculator.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.poc.carbon_footprint_calculator.models.Person;

public interface PersonRepository extends JpaRepository<Person, Integer> {
}
