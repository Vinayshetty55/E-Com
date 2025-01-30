package com.ecom.backend.service;
import com.ecom.backend.model.Payment;
import com.ecom.backend.repo.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PaymentService {

        @Autowired
        private PaymentRepository paymentRepository;

        public void processPayment(Payment payment) {
            payment.setPaymentStatus("PAID");
            paymentRepository.save(payment);
        }

        public List<Payment> getAllPayments() {
            return paymentRepository.findAll();
        }
}
