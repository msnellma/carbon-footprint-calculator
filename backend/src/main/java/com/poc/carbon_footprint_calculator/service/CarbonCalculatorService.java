package com.poc.carbon_footprint_calculator.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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
  
    public List<CarbonItem> getItemsByCategory(String category) {
        System.out.println(carbonItemRepository.findByCategory(category));
        return carbonItemRepository.findByCategory(category);
    }

    // public int calculateCost(ModelsReceived models) {
    //     List<ReceivedItem> items = models.getItems();
    //     List<Integer> itemIds = new ArrayList<Integer>();

    //     // Get ids
    //     for ( ReceivedItem item : items ) {
    //         itemIds.add(item.getId());
    //     }

    //     int totalImpact = 0;

    //     // Get all table rows
    //     List<CarbonItem> carbonItems = carbonItemRepository.findAllById(itemIds);

    //     for (int i = 0; i < carbonItems.size(); i++) {
    //         totalImpact += carbonItems.get(i).getCost() * items.get(i).getQuantity();
    //     }
    //     // Loop over all received items
    //     // See where they match with rows
        
    //     // Refactor modelsReceived and do one fetch and iterate over that result instead of calling db many times
    //     // for (ReceivedItem food : foods) {
    //     //     CarbonItem foodItem = carbonItemRepository.findById(food.getId()).get();
    //     //     totalImpact += foodItem.getCost() * food.getQuantity();
    //     // }   

    //     // for (ReceivedItem travel : travels) {
    //     //     CarbonItem travelItem = carbonItemRepository.findById(travel.getId()).get();
    //     //     totalImpact += travelItem.getCost() * travel.getQuantity();
    //     // } 

    //     // for (ReceivedItem consumption : consumptions) {
    //     //     CarbonItem consumptionItem = carbonItemRepository.findById(consumption.getId()).get();
    //     //     totalImpact += consumptionItem.getCost() * consumption.getQuantity();
    //     // }   
        
    //     return totalImpact;
    // }

    public int calculateCost(ModelsReceived models) {
        Map<Integer, Integer> itemQuantities = models.getItems().stream()
        .collect(Collectors.toMap(ReceivedItem::getId, ReceivedItem::getQuantity));

        return carbonItemRepository.findAllById(itemQuantities.keySet()).stream()
            .mapToInt(carbonItem -> carbonItem.getCost() * itemQuantities.getOrDefault(carbonItem.getId(), 0))
            .sum();
    }
 
}
