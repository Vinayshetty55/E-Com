import React, { useContext, useState, useEffect } from "react";
import AppContext from "../Context/Context";
import axios from "axios";
import CheckoutPopup from "./CheckoutPopup";
import { Button } from "react-bootstrap";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useContext(AppContext);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/products");
        const backendProductIds = response.data.map((product) => product.id);

        const updatedCartItems = cart.filter((item) =>
          backendProductIds.includes(item.id)
        );

        const cartItemsWithImages = await Promise.all(
          updatedCartItems.map(async (item) => {
            try {
              const response = await axios.get(
                `http://localhost:8081/api/product/${item.id}/image`,
                { responseType: "blob" }
              );
              const imageUrl = URL.createObjectURL(response.data);
              return { ...item, imageUrl };
            } catch (error) {
              console.error("Error fetching image:", error);
              return { ...item, imageUrl: "placeholder-image-url" };
            }
          })
        );
        setCartItems(cartItemsWithImages);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    if (cart.length) {
      fetchCartItems();
    }
  }, [cart]);

  useEffect(() => {
    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  }, [cartItems]);

  const handleIncreaseQuantity = (itemId) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCartItems);
  };

  const handleDecreaseQuantity = (itemId) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === itemId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedCartItems);
  };

  const handleRemoveFromCart = (itemId) => {
    removeFromCart(itemId);
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "900px",
        margin: "0 auto",
        backgroundColor: "#f9f9f9",
        borderRadius: "12px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        marginTop: "80px", // Added margin-top to avoid overlapping with the navbar
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "20px",
          fontWeight: "bold",
          fontSize: "24px",
          color: "#333",
        }}
      >
        Cart
      </h2>
      {cartItems.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "2rem",
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h4>Your cart is empty</h4>
        </div>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px",
                marginBottom: "10px",
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div style={{ flex: 2 }}>
                <h4
                  style={{
                    margin: "0 0 5px 0",
                    fontWeight: "bold",
                    color: "#333",
                  }}
                >
                  {item.name}
                </h4>
                <p style={{ margin: 0, color: "#888" }}>Brand: {item.brand}</p>
              </div>
              <div
                style={{
                  flex: 1.5,
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <button
                  onClick={() => handleDecreaseQuantity(item.id)}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#ff6f61",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  -
                </button>
                <span
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "#333", // Ensure quantity is visible
                  }}
                >
                  {item.quantity}
                </span>
                <button
                  onClick={() => handleIncreaseQuantity(item.id)}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#28a745",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  +
                </button>
              </div>
              <div style={{ flex: 1, textAlign: "center" }}>
                <p
                  style={{
                    margin: "0 0 5px 0",
                    fontWeight: "bold",
                    color: "#333", // Ensure amount is visible
                  }}
                >
                  ₹{item.price * item.quantity}
                </p>
              </div>
              <div style={{ flex: 1, textAlign: "center" }}>
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                    borderRadius: "4px",
                  }}
                />
              </div>
              <div style={{ flex: 0.5, textAlign: "center" }}>
                <button
                  onClick={() => handleRemoveFromCart(item.id)}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#dc3545",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          <div
            style={{
              textAlign: "right",
              marginTop: "20px",
              fontSize: "18px",
              fontWeight: "bold",
              color: "#333",
            }}
          >
            Total: ₹{totalPrice}
          </div>
          <Button
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              marginTop: "20px",
            }}
            onClick={() => setShowModal(true)}
          >
            Checkout
          </Button>
        </div>
      )}
      <CheckoutPopup
        show={showModal}
        handleClose={() => setShowModal(false)}
        cartItems={cartItems}
        totalPrice={totalPrice}
        handleCheckout={clearCart}
      />
    </div>
  );
};

export default Cart;
