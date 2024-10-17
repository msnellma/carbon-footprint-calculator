package com.poc.carbon_footprint_calculator.models;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ModelsReceived {

    @JsonProperty("food")
    private int food;

    @JsonProperty("consumption")
    private int consumption;

    @JsonProperty("travel")
    private int travel;

    public int getFood() {
        return food;
    }

    public void setFood(int food) {
        this.food = food;
    }

    public int getConsumption() {
        return consumption;
    }

    public void setConsumption(int consumption) {
        this.consumption = consumption;
    }

    public int getTravel() {
        return travel;
    }

    public void setTravel(int travel) {
        this.travel = travel;
    }
}