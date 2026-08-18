package com.deepesh.ems.repository;

import com.deepesh.ems.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    // Derived query methods - Spring Data JPA implements these automatically
    List<Employee> findByDepartment(String department);

    Optional<Employee> findByEmail(String email);

    List<Employee> findBySalaryGreaterThan(Double salary);
}
