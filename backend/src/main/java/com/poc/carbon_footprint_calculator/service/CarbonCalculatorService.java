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
        return carbonItemRepository.findByCategory(category);
    }

    public List<CarbonItem> getAllItems() {
        return carbonItemRepository.findAll();
    }

    public int calculateCost(ModelsReceived models) {
        Map<Integer, Integer> itemQuantities = models.getItems().stream()
        .collect(Collectors.toMap(ReceivedItem::getId, ReceivedItem::getQuantity, Integer::sum));

        return carbonItemRepository.findAllById(itemQuantities.keySet()).stream()
            .mapToInt(carbonItem -> carbonItem.getCost() * itemQuantities.getOrDefault(carbonItem.getId(), 0))
            .sum();
    }
 
}
