package com.poc.carbon_footprint_calculator.api;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.poc.carbon_footprint_calculator.models.CarbonItem;
import com.poc.carbon_footprint_calculator.models.ModelsReceived;
import com.poc.carbon_footprint_calculator.models.ReceivedItem;

import java.util.List;
import java.util.Arrays;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

// TODO: Implement POST request for Controller for better testing
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class CarbonCalculatorControllerIntegrationTest {

    @Autowired
    private TestRestTemplate testRestTemplate;

    @Test
    @DisplayName("Test /allItems endpoint")
    void testGetAllItems_shouldReturnCarbonItems() {
        // Arrange
        // Act
        // We don't need a RequestEntity or HttpEntity for this simple get request
        ResponseEntity<List<CarbonItem>> response = testRestTemplate.exchange("/api/allItems", HttpMethod.GET, null, new ParameterizedTypeReference<List<CarbonItem>>() {});
        List<CarbonItem> responseItems = response.getBody();

        // Assert
        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode(), "Response did not return OK status code.");
        Assertions.assertTrue(responseItems.size() > 0, "Returned item list from response is empty.");
    }

    @Test
    @DisplayName("Test /{category} endpoint")
    void testGetItemsFromCategory_shouldReturnCarbonItems() {
        // Arrange
        String category = "Food";
        // Act
        // We don't need a RequestEntity or HttpEntity for this simple get request
        ResponseEntity<List<CarbonItem>> response = testRestTemplate.exchange("/api/" + category, HttpMethod.GET, null, new ParameterizedTypeReference<List<CarbonItem>>() {});
        List<CarbonItem> responseItems = response.getBody();

        // Assert
        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode(), "Response did not return OK status code.");
        Assertions.assertTrue(responseItems.size() > 0, "Returned item list from response is empty.");
    }

    @Test
    @DisplayName("Test /calculate endpoint")
    void testCalculate_shouldReturnCorrectCalculation() throws JsonProcessingException {
        // Arrange
        // Objects in post
        ModelsReceived models = new ModelsReceived();
        models.setItems(List.of(
            new ReceivedItem(1, 1), 
            new ReceivedItem(37, 10))
            );

        
        int expectedCost = 1 * 100 + 10 * 15; // Id 1 = 100, Id 37 = 15

        // Headers and request
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));

        HttpEntity<ModelsReceived> request = new HttpEntity<>(models, headers); // was HttpEntity<String> request = new HttpEntity<>(new ObjectMapper().writeValuesAsString(models), headers);

        // Act
        ResponseEntity<Integer> response = testRestTemplate.exchange("/api/calculate", HttpMethod.POST, request, Integer.class);
        int responseCost = response.getBody();

        // Assert
        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode(), "Response did not return OK status");
        Assertions.assertEquals(expectedCost, responseCost, "Calculated cost is not equal to the expected cost.");
    }
}
