package com.ecom.backend.repo;

import com.ecom.backend.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;



public interface CustomerRepository extends JpaRepository<Customer , Long> {
//    Customer findByUsername(String username);
    Customer findByUsername(String username);
}
