package com.poc.carbon_footprint_calculator.models;

import java.util.List;

public class ModelsReceived{
    private List<ReceivedItem> foods = List.of();
    private List<ReceivedItem> travels = List.of();
    private List<ReceivedItem> consumptions = List.of();

    public List<ReceivedItem> getFoods() {
        return foods;
    }

    public void setFoods(List<ReceivedItem> foods) {
        this.foods = foods;
    }

    public List<ReceivedItem> getTravels() {
        return travels;
    }

    public void setTravels(List<ReceivedItem> travels) {
        this.travels = travels;
    }

    public List<ReceivedItem> getConsumptions() {
        return consumptions;
    }

    public void setConsumptions(List<ReceivedItem> consumptions) {
        this.consumptions = consumptions;
    }
}

