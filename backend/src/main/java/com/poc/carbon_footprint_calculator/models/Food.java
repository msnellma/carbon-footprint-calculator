package com.poc.carbon_footprint_calculator.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Food {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String category; // Protein, Carbs, Fat, Vegetables
    private String foodItem; 
    private int cost;

    public void setFoodItem(String item) {
        this.foodItem = item;
    }

    public String getFoodItem() {
        return this.foodItem;
    }

    public int getCost() {
        return cost;
    }

    public void setCost(int cost) {
        this.cost = cost;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}
