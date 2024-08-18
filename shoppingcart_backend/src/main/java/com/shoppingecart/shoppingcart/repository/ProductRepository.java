package com.shoppingecart.shoppingcart.repository;


import com.shoppingecart.shoppingcart.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Integer> {

	List<Product> findByIsActiveTrue();

	List<Product> findByCategory(String category);





}
