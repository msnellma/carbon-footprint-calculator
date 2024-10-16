package com.poc.carbon_footprint_calculator.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.poc.carbon_footprint_calculator.models.Travel;

public interface TravelRepository extends JpaRepository<Travel, Integer> {

}
