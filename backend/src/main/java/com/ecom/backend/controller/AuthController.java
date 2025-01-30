//package com.ecom.backend.controller;
//
//import com.ecom.backend.model.Customer;
//import com.ecom.backend.service.CustomerService;
//import com.ecom.backend.utils.Jwtutil;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.AuthenticationException;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/api/auth")
//@CrossOrigin(origins = "http://localhost:5173")
//public class AuthController {
//
//    @Autowired
//    private CustomerService customerService;
//
//    @Autowired
//    private AuthenticationManager authenticationManager;
//
//    @Autowired
//    private Jwtutil jwtutil;
//
//    @PostMapping("/register")
//    public ResponseEntity<String> register(@RequestBody Customer customer){
//        customerService.registerCustomer(customer);
//        return ResponseEntity.ok("User Registerd sucessfully");
//    }
//
//    @PostMapping("/login")
//    public ResponseEntity<String> login(@RequestBody Customer customer){
//        try {
//            authenticationManager.authenticate(
//                    new UsernamePasswordAuthenticationToken(customer.getUsername(), customer.getPassword())
//            );
//            String token = jwtutil.generateToken(customer.getUsername());
//            return ResponseEntity.ok(token);
//        } catch (AuthenticationException e) {
//            return ResponseEntity.status(401).body("Invalid username or password");
//        }
//    }
//}


package com.ecom.backend.controller;

import com.ecom.backend.model.Customer;
import com.ecom.backend.service.CustomerService;
import com.ecom.backend.utils.Jwtutil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private CustomerService customerService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private Jwtutil jwtutil;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody Customer customer) {
        customerService.registerCustomer(customer);
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Customer customer) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(customer.getUsername(), customer.getPassword())
            );
            String token = jwtutil.generateToken(customer.getUsername(),customer.getRole());
            return ResponseEntity.ok(token);
        } catch (AuthenticationException e) {
            return ResponseEntity.status(401).body("Invalid username or password");
        }
    }
}
