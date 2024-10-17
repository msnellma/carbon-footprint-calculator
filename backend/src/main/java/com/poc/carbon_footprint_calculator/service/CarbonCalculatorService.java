package com.poc.carbon_footprint_calculator.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.poc.carbon_footprint_calculator.models.Consumption;
import com.poc.carbon_footprint_calculator.models.Food;
import com.poc.carbon_footprint_calculator.models.Travel;
import com.poc.carbon_footprint_calculator.repository.ConsumptionRepository;
import com.poc.carbon_footprint_calculator.repository.FoodRepository;
import com.poc.carbon_footprint_calculator.repository.TravelRepository;

@Service
public class CarbonCalculatorService {

    @Autowired
    private ConsumptionRepository consumptionRepository;

    @Autowired
    private FoodRepository foodRepository;

    @Autowired
    private TravelRepository travelRepository; 

    public List<Food> getAllFoods() {
        return foodRepository.findAll();
    }

    public List<Travel> getAllTravels() {
        return travelRepository.findAll();
    }

    public List<Consumption> getAllConsumptions() {
        return consumptionRepository.findAll();
    }

}
