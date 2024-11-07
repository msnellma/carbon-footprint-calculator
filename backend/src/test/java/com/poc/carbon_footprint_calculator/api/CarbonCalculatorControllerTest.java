package com.poc.carbon_footprint_calculator.api;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.poc.carbon_footprint_calculator.models.CarbonItem;
import com.poc.carbon_footprint_calculator.models.ModelsReceived;
import com.poc.carbon_footprint_calculator.models.ReceivedItem;
import com.poc.carbon_footprint_calculator.service.CarbonCalculatorService;

// Unit test for web layer
@WebMvcTest(controllers = CarbonCalculatorController.class)
public class CarbonCalculatorControllerTest {

    @MockBean
    CarbonCalculatorService carbonCalculatorService;

    @Autowired
    private MockMvc mockMvc;

    private List<CarbonItem> mockItems;

    @BeforeEach
    void setup()  {
        mockItems = List.of(
            new CarbonItem(1, "Food", "Protein", "Tofu", 1, "g"),
            new CarbonItem(2, "Travel", "Bus", "Electric", 5, "km"),
            new CarbonItem(3, "Consumption", "Clothes", "Shoes", 10, "pc"),
            new CarbonItem(4, "Food", "Protein", "Halloumi", 2, "g"),
            new CarbonItem(5, "Travel", "Bike", "Electric", 2, "km"),
            new CarbonItem(6, "Consumption", "Electronics", "TV", 100, "pc")
        );       
    }

    @Test
    void testGetAllItems_returnsCorrectItems() throws Exception {
        // Arrange  
        when(carbonCalculatorService.getAllItems()).thenReturn(mockItems);

        RequestBuilder requestBuilder = MockMvcRequestBuilders.get("/api/allItems")
        .accept(MediaType.APPLICATION_JSON);

        // Act
        MvcResult mvcResult = mockMvc.perform(requestBuilder).andReturn();
        String jsonResponse = mvcResult.getResponse().getContentAsString();
        List<CarbonItem> responseItems = new ObjectMapper().readValue(jsonResponse, new TypeReference<List<CarbonItem>>() {});
        
        // Assert
        Assertions.assertEquals(mockItems.size(), responseItems.size(), "List from response not same size as service list");
        Assertions.assertEquals(mockItems.get(0).getId(), responseItems.get(0).getId(), "Id of first element in response not equal to service item");
        Assertions.assertEquals(mockItems.get(1).getItem(), responseItems.get(1).getItem(), "Item of second element in response not equal to service item");
        Assertions.assertEquals(HttpStatus.OK.value(), mvcResult.getResponse().getStatus(), "Expected HTTP Status " + HttpStatus.OK.value() + " but got " + mvcResult.getResponse().getStatus());
    }

    @Test
    void testGetItemsFromCategory_returnsCorrectItems() throws Exception {
        // Arrange 
        String category = "Food";
        List<CarbonItem> mockItemsCategory = List.of(mockItems.get(0), mockItems.get(1));
        when(carbonCalculatorService.getItemsByCategory(category)).thenReturn(mockItemsCategory);
        
        RequestBuilder requestBuilder = MockMvcRequestBuilders.get("/api/" + category)
        .accept(MediaType.APPLICATION_JSON);
        
        // Act
        MvcResult mvcResult = mockMvc.perform(requestBuilder).andReturn();
        String jsonResponse = mvcResult.getResponse().getContentAsString();
        List<CarbonItem> responseItems = new ObjectMapper().readValue(jsonResponse, new TypeReference<List<CarbonItem>>() {});

        // Assert
        Assertions.assertEquals(mockItemsCategory.size(), responseItems.size(), "List from response not same size as service list");
        Assertions.assertEquals(mockItemsCategory.get(0).getId(), responseItems.get(0).getId(), "Id of first element in response not equal to service item");
        Assertions.assertEquals(mockItemsCategory.get(1).getItem(), responseItems.get(1).getItem(), "Item of second element in response not equal to service item");
        Assertions.assertEquals(HttpStatus.OK.value(), mvcResult.getResponse().getStatus(), "Expected HTTP Status " + HttpStatus.OK.value() + " but got " + mvcResult.getResponse().getStatus());
    }

    @Test
    void testCaclulateCost_returnsCorrectCost() throws Exception {
        // Arrange
        List<ReceivedItem> items = List.of(
            new ReceivedItem(1, 10),
            new ReceivedItem(5, 5)
        );
        ModelsReceived models = new ModelsReceived();
        models.setItems(items);

        int totalCost = 0;
        for ( ReceivedItem item : items ) {
            for ( CarbonItem cItem : mockItems ) {
                if (item.getId() == cItem.getId()) {
                    totalCost += item.getQuantity() * cItem.getCost();
                }
            }
        }
        when(carbonCalculatorService.calculateCost(any(ModelsReceived.class))).thenReturn(totalCost);

        RequestBuilder requestBuilder = MockMvcRequestBuilders.post("/api/calculate")
        .contentType(MediaType.APPLICATION_JSON)
        .accept(MediaType.APPLICATION_JSON)
        .content(new ObjectMapper().writeValueAsString(models));

        // Act
        MvcResult mvcResult = mockMvc.perform(requestBuilder).andReturn();
        String responseBodyString = mvcResult.getResponse().getContentAsString();
        int responseCost = new ObjectMapper().readValue(responseBodyString, Integer.class);

        // Assert
        Assertions.assertEquals(totalCost, responseCost, "Calculated cost not equal to expected cost");
        Assertions.assertEquals(HttpStatus.OK.value(), mvcResult.getResponse().getStatus(), "Expected HTTP Status " + HttpStatus.OK.value() + " but got " + mvcResult.getResponse().getStatus());
    }

}
