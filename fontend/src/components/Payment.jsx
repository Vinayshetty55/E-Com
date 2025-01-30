import React, { useState } from "react";

const Payment = () => {
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });

  const [paymentStatus, setPaymentStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simulate payment API call
    const response = await fetch("http://localhost:8081/api/payment/process", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: 100, // Replace with the actual amount
        paymentStatus: "PENDING",
        userId: "user123", // Replace with dynamic userId if available
      }),
    });

    if (response.ok) {
      setPaymentStatus("success");
    } else {
      setPaymentStatus("failure");
    }
  };

  if (paymentStatus === "success") {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          backgroundColor: "#d4edda",
        }}
      >
        <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#155724" }}>
          Payment Successful!
        </h2>
        <p>Your transaction was processed successfully.</p>
      </div>
    );
  }

  if (paymentStatus === "failure") {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          backgroundColor: "#f8d7da",
        }}
      >
        <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#721c24" }}>
          Payment Failed
        </h2>
        <p>Something went wrong. Please try again.</p>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f8f9fa",
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "24px",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <h2
          style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}
        >
          Payment Gateway
        </h2>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "16px" }}
        >
          <div>
            <label
              style={{
                display: "block",
                fontWeight: "500",
                marginBottom: "8px",
              }}
            >
              Card Number
            </label>
            <input
              type="text"
              name="cardNumber"
              maxLength="16"
              value={formData.cardNumber}
              onChange={handleInputChange}
              required
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ced4da",
                borderRadius: "4px",
              }}
              placeholder="1234 5678 9012 3456"
            />
          </div>
          <div style={{ display: "flex", gap: "16px" }}>
            <div>
              <label
                style={{
                  display: "block",
                  fontWeight: "500",
                  marginBottom: "8px",
                }}
              >
                Expiry Date
              </label>
              <input
                type="text"
                name="expiryDate"
                maxLength="5"
                value={formData.expiryDate}
                onChange={handleInputChange}
                required
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ced4da",
                  borderRadius: "4px",
                }}
                placeholder="MM/YY"
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  fontWeight: "500",
                  marginBottom: "8px",
                }}
              >
                CVV
              </label>
              <input
                type="password"
                name="cvv"
                maxLength="3"
                value={formData.cvv}
                onChange={handleInputChange}
                required
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ced4da",
                  borderRadius: "4px",
                }}
                placeholder="123"
              />
            </div>
          </div>
          <div>
            <label
              style={{
                display: "block",
                fontWeight: "500",
                marginBottom: "8px",
              }}
            >
              Cardholder Name
            </label>
            <input
              type="text"
              name="cardholderName"
              value={formData.cardholderName}
              onChange={handleInputChange}
              required
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ced4da",
                borderRadius: "4px",
              }}
              placeholder="John Doe"
            />
          </div>
          <div style={{ marginTop: "16px" }}>
            <button
              type="submit"
              style={{
                width: "100%",
                backgroundColor: "#007bff",
                color: "#fff",
                padding: "10px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "500",
              }}
            >
              Pay Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Payment;
