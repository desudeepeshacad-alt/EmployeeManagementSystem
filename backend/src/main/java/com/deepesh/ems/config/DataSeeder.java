package com.deepesh.ems.config;

import com.deepesh.ems.entity.Employee;
import com.deepesh.ems.repository.EmployeeRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataSeeder {

    // CommandLineRunner beans run automatically once on application startup
    @org.springframework.context.annotation.Bean
    public CommandLineRunner seedDatabase(EmployeeRepository repository) {
        return args -> {
            repository.save(new Employee("Aditi Rao", "aditi.rao@company.com", "Engineering", 85000.0));
            repository.save(new Employee("Rahul Mehta", "rahul.mehta@company.com", "Engineering", 92000.0));
            repository.save(new Employee("Sneha Iyer", "sneha.iyer@company.com", "Human Resources", 65000.0));
            repository.save(new Employee("Vikram Nair", "vikram.nair@company.com", "Finance", 78000.0));
        };
    }
}
