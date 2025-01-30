package com.ecom.backend.controller;


import com.ecom.backend.model.Payment;
import com.ecom.backend.service.PaymentService;
import com.ecom.backend.utils.Jwtutil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private Jwtutil jwtutil;
    @Autowired
    private PaymentService paymentService;


    @GetMapping("/admin")
    public ResponseEntity<String> adminEndpoint(HttpServletRequest request) {
        String token = request.getHeader("Authorization").substring(7);
        String role = jwtutil.extractRole(token);

        if (!"ROLE_ADMIN".equals(role)) {
            return ResponseEntity.status(403).body("Access Denied");
        }

        return ResponseEntity.ok("Admin Task Executed Successfully");
    }

    @PostMapping("/process")
    public ResponseEntity<String> processPayment(@RequestBody Payment payment) {
        paymentService.processPayment(payment);
        return ResponseEntity.ok("Payment processed successfully");
    }

}
