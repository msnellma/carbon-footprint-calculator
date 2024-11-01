package com.poc.carbon_footprint_calculator.models;

import java.util.List;

public class ModelsReceived{
    private List<ReceivedItem> items = List.of();

    public List<ReceivedItem> getItems() {
        return items;
    }

    public void setItems(List<ReceivedItem> items) {
        this.items = items;
    }

}

