package com.ecom.backend.service;

import com.ecom.backend.model.Product;
import com.ecom.backend.repo.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.List;

@Service
public class ProductService {
    @Autowired
    private ProductRepo productRepo;


    public List<Product> getAllProducts(){
        return productRepo.findAll();
    };

    public Product getProductById(int id) {
        return productRepo.findById(id).orElse(new Product(-1));
    }

    public String convertToBase64(byte[] imageBytes) {
        return Base64.getEncoder().encodeToString(imageBytes);
    }

    public Product addOrUpdateProduct(Product product, MultipartFile image) throws IOException {
        product.setImageName(image.getOriginalFilename());
        product.setImageType(image.getContentType());
        product.setImageData(image.getBytes());
        return productRepo.save(product);
    }

    public void deleteProduct(int id) {
        productRepo.deleteById(id);
    }

    public List<Product> searchProducts(String keyword) {
        System.out.println("🔍 Searching with keyword: " + keyword);
        List<Product> result = productRepo.searchProducts(keyword);
        System.out.println("✅ Search Result from DB: " + result);

        return result;
    }

    public String getProductImageAsBase64(int productId) {
        Product product = getProductById(productId);
        return convertToBase64(product.getImageData());
    }
}
