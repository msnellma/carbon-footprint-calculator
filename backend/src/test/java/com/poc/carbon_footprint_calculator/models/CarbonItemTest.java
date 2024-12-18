package com.poc.carbon_footprint_calculator.models;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.TestPropertySource;


@DataJpaTest
@TestPropertySource(properties = "spring.sql.init.mode=never")
public class CarbonItemTest {

    @Autowired
    TestEntityManager testEntityManager;

    CarbonItem item;

    @BeforeEach
    void setup() {
        item = new CarbonItem();
        item.setCategory("Food");
        item.setSubCategory("Protein");
        item.setItem("Tofu");
        item.setCost(10);
        item.setUnit("g");
    }

    @Test
    void testCarbonItemEntity_whenValidDetailsProvided_shouldReturnStoredDetails() {
        // Arrange: item initialization done in setup()      

        // Act: persist and flush item
        CarbonItem storedItem = testEntityManager.persistAndFlush(item);

        // Assert
        assertTrue(storedItem.getId() > 0, "Item id not generated correctly");
        assertEquals(item.getCategory(), storedItem.getCategory(), "Item and stored item categories don't match");
        assertEquals(item.getSubCategory(), storedItem.getSubCategory(), "Item and stored item subcategories don't match");
        assertEquals(item.getItem(), storedItem.getItem(), "Item and stored item types don't match");
        assertEquals(item.getCost(), storedItem.getCost(), "Item and stored item costs don't match");
        assertEquals(item.getUnit(), storedItem.getUnit(), "Item and stored item units don't match");
    }

}
