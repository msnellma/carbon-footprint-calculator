package com.poc.carbon_footprint_calculator.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.poc.carbon_footprint_calculator.models.CarbonItem;
import com.poc.carbon_footprint_calculator.models.ReceivedItem;
import com.poc.carbon_footprint_calculator.models.ModelsReceived;
import com.poc.carbon_footprint_calculator.repository.CarbonItemRepository;

@Service
public class CarbonCalculatorService {

    @Autowired
    private CarbonItemRepository carbonItemRepository;

    public List<CarbonItem> getAllFoods() {
        return carbonItemRepository.findByCategory("Food");
    }

    public List<CarbonItem> getAllTravels() {
        return carbonItemRepository.findByCategory("Travel");
    }

    public List<CarbonItem> getAllConsumptions() {
        return carbonItemRepository.findByCategory("Consumption");
    }

    public int calculateCost(ModelsReceived models) {
        List<ReceivedItem> foods = models.getFoods();
        List<ReceivedItem> travels = models.getTravels();
        List<ReceivedItem> consumptions = models.getConsumptions(); 

        int totalImpact = 0;

        for (ReceivedItem food : foods) {
            CarbonItem foodItem = carbonItemRepository.findById(food.getId()).get();
            totalImpact += foodItem.getCost() * food.getQuantity();
        }   

        for (ReceivedItem travel : travels) {
            CarbonItem travelItem = carbonItemRepository.findById(travel.getId()).get();
            totalImpact += travelItem.getCost() * travel.getQuantity();
        } 

        for (ReceivedItem consumption : consumptions) {
            CarbonItem consumptionItem = carbonItemRepository.findById(consumption.getId()).get();
            totalImpact += consumptionItem.getCost() * consumption.getQuantity();
        }   
        
        return totalImpact;
    }
 
}
