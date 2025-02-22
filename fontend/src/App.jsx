import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import LoginSignup from "./components/LoginSignup";
import Cart from "./components/Cart";
import AddProduct from "./components/AddProduct";
import AllProducts from "./components/AllProducts";
import UpdateProduct from "./components/UpdateProduct";
import Product from "./components/Product";
import Payment from "./components/Payment"; // Import Payment page
import { AppProvider } from "./Context/Context";
import CheckoutPopup from "./components/CheckoutPopup";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const App = () => {
  const [cart, setCart] = useState([]);
  const [showCheckoutPopup, setShowCheckoutPopup] = useState(false);
  const location = useLocation();

  const showNavbar = !["/login", "/signup"].includes(location.pathname);

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  return (
    <AppProvider>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home addToCart={addToCart} />} />
        <Route path="/add_product" element={<AddProduct />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/signup" element={<LoginSignup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/update/:id" element={<UpdateProduct />} />
        <Route path="/all-products" element={<AllProducts />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/payment" element={<Payment />} /> {/* Payment route */}
      </Routes>
      <CheckoutPopup
        show={showCheckoutPopup}
        handleClose={() => setShowCheckoutPopup(false)}
        cartItems={cart}
        totalPrice={cart.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        )}
      />
    </AppProvider>
  );
};

export default App;
