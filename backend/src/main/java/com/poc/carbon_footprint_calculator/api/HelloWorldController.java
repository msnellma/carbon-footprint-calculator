package com.poc.carbon_footprint_calculator.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poc.carbon_footprint_calculator.service.PersonService;
import com.poc.carbon_footprint_calculator.models.Person;

import java.util.List;

@RestController
// @RequestMapping("/api")
public class HelloWorldController {

    @Autowired
    private PersonService service;

    @GetMapping(path="/hello-world")
    public String HelloWorld() {
        return "Hello, world!";
    }

    @GetMapping(path="/persons") 
    public List<Person> Persons() {
        return service.getAllPersons();
    }

    @GetMapping(path="/persons/{id}")
    public ResponseEntity<Person> getPersonById(@PathVariable int id) {
        Person person = service.getPersonById(id);
        return new ResponseEntity<>(person, HttpStatus.OK);
    }

    @PostMapping(path="/persons")
    public ResponseEntity<Person> createPerson(@RequestBody Person person) {
        Person savedPerson = service.setPerson(person);
        return new ResponseEntity<Person>(savedPerson, HttpStatus.CREATED);
    }

}
