package com.poc.carbon_footprint_calculator.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.poc.carbon_footprint_calculator.models.Person;
import com.poc.carbon_footprint_calculator.repository.PersonRepository;

import java.util.List;

@Service
public class PersonService {

    @Autowired
    private PersonRepository repository;

    public List<Person> getAllPersons() {
        return repository.findAll();
    }

}
