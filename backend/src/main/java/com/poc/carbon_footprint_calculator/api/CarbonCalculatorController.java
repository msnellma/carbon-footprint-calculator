package com.poc.carbon_footprint_calculator.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poc.carbon_footprint_calculator.models.Consumption;
import com.poc.carbon_footprint_calculator.models.Food;
import com.poc.carbon_footprint_calculator.models.Travel;
import com.poc.carbon_footprint_calculator.service.CarbonCalculatorService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class CarbonCalculatorController {

    @Autowired
    private CarbonCalculatorService service;

    @GetMapping("/food")
    public List<Food> getAllFoods() {
        return service.getAllFoods();
    }

    @GetMapping("/travel")
    public List<Travel> getAllTravels() {
        return service.getAllTravels();
    }

    @GetMapping("/consumption")
    public List<Consumption> getAllConsumptions() {
        return service.getAllConsumptions();
    }

}
