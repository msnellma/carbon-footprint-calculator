package com.poc.carbon_footprint_calculator.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Food {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String subCategory; // Protein, Carbs, Fat, Vegetables
    private String item; 
    private int cost;

    public void setItem(String item) {
        this.item = item;
    }

    public String getItem() {
        return this.item;
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

    public String getSubCategory() {
        return subCategory;
    }

    public void setSubCategory(String category) {
        this.subCategory = category;
    }
}
