package com.ecom.backend.repo;

import com.ecom.backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepo extends JpaRepository<Product,Integer> {


//    @Query("SELECT p FROM Product p WHERE " +
//            "LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
//            "LOWER(p.description) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
//            "LOWER(p.brand) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
//            "LOWER(p.category) LIKE LOWER(CONCAT('%', :keyword, '%'))")
//    List<Product> searchProducts(String keyword);


    @Query("SELECT p FROM Product p WHERE " +
            "LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(p.description) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(p.brand) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(p.category) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Product> searchProducts(@Param("keyword") String keyword);

    List<Product> findByNameContainingIgnoreCase(String name);

}
