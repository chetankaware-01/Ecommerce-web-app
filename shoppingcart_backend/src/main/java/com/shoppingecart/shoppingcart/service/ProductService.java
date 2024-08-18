package com.shoppingecart.shoppingcart.service;

import com.shoppingecart.shoppingcart.model.Product;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProductService {

	public Product saveProduct(Product product);

	public List<Product> getAllProducts();

	public Boolean deleteProduct(Integer id);

	public Product getProductById(Integer id);

	public Product updateProduct(Product product, MultipartFile file);

	public List<Product> getAllActiveProducts(String category);

//	public List<Product> getProductsByCategory(String category);
	
}
