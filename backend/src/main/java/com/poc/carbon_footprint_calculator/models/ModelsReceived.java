package com.poc.carbon_footprint_calculator.models;

import java.util.List;

public class ModelsReceived{
    private List<Item> foods = List.of();
    private List<Item> travels = List.of();
    private List<Item> consumptions = List.of();

    public List<Item> getFoods() {
        return foods;
    }

    public void setFoods(List<Item> foods) {
        this.foods = foods;
    }

    public List<Item> getTravels() {
        return travels;
    }

    public void setTravels(List<Item> travels) {
        this.travels = travels;
    }

    public List<Item> getConsumptions() {
        return consumptions;
    }

    public void setConsumptions(List<Item> consumptions) {
        this.consumptions = consumptions;
    }
}

