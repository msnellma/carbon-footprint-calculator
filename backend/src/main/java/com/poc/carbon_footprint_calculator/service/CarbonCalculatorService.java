package com.poc.carbon_footprint_calculator.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.poc.carbon_footprint_calculator.repository.ConsumptionRepository;
import com.poc.carbon_footprint_calculator.repository.FoodRepository;
import com.poc.carbon_footprint_calculator.repository.TravelRepository;

import java.util.List;

@Service
public class CarbonCalculatorService {

    @Autowired
    private ConsumptionRepository consumptionRepository;

    @Autowired
    private FoodRepository foodRepository;

    @Autowired
    private TravelRepository travelRepository;

    // Todo return categories from a certain repository
    // public List<String> getCategoryByType(String type) {
        
    // }


}
