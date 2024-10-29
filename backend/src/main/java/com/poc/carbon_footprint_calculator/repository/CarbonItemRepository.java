package com.poc.carbon_footprint_calculator.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.poc.carbon_footprint_calculator.models.CarbonItem;

public interface CarbonItemRepository extends JpaRepository<CarbonItem, Integer> {

    public List<CarbonItem> findByCategory(String category);

}
