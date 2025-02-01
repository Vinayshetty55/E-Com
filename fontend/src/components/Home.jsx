import React, { useEffect, useState } from "react";
import "../Home.css";

const Home = () => {
  const [timeLeft, setTimeLeft] = useState("");

  // Countdown timer logic
  useEffect(() => {
    const countdown = () => {
      const targetTime = new Date().getTime() + 12 * 60 * 60 * 1000; // 12 hours from now
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const difference = targetTime - now;

        if (difference <= 0) {
          clearInterval(interval);
          setTimeLeft("Offer expired!");
        } else {
          const hours = Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor(
            (difference % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);
          setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
        }
      }, 1000);
      return () => clearInterval(interval);
    };
    countdown();
  }, []);

  return (
    <main className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay">
          <h1 className="hero-text">Free Shipping Ends In:</h1>
          <h2 className="timer">{timeLeft}</h2>
          <button className="cta-button">Shop Now</button>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories">
        <h2 className="section-title">Shop by Categories</h2>
        <div className="category-grid">
          <div className="category-card">
            <img src="/Images/Acessaries.jpg" alt="Electronics" />
            <p>Electronics</p>
          </div>
          <div className="category-card">
            <img src="/Images/Clothing.jpg" alt="Fashion" />
            <p>Fashion</p>
          </div>
          <div className="category-card">
            <img src="/Images/HomeAplience.jpg" alt="Home Appliances" />
            <p>Home Appliances</p>
          </div>
          <div className="category-card">
            <img src="/Images/BeautyProduct.jpg" alt="Beauty" />
            <p>Beauty</p>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products">
        <h2 className="section-title">Featured Products</h2>
        <div className="product-grid">
          <div className="product-card">
            <img src="/Images/SmartPhones.jpg" alt="Smartphone" />
            <p>Smartphone</p>
            <button>View More</button>
          </div>
          <div className="product-card">
            <img src="/Images/Gaming.jpg" alt="Gaming Laptop" />
            <p>Gaming Laptop</p>
            <button>View More</button>
          </div>
          <div className="product-card">
            <img src="/Images/HeadPhone.jpg" alt="Headphones" />
            <p>Headphones</p>
            <button>View More</button>
          </div>
          <div className="product-card">
            <img src="/Images/SmartWatch.jpg" alt="Smartwatch" />
            <p>Smartwatch</p>
            <button>View More</button>
          </div>
        </div>
      </section>

      {/* Customer Query Section */}
      <section className="customer-query">
        <h2 className="section-title">Customer Query</h2>
        <div className="query-list">
          <div className="query-card">
            <h3>John Doe</h3>
            <p>"What is the return policy for electronics?"</p>
            <p>
              <strong>Answer:</strong> You can return electronics within 30
              days.
            </p>
          </div>
          <div className="query-card">
            <h3>Jane Smith</h3>
            <p>"How long does shipping take?"</p>
            <p>
              <strong>Answer:</strong> Standard shipping takes 3-5 business
              days.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="contact-us">
        <h2 className="section-title">Contact Us</h2>
        <div className="contact-details">
          <p>
            <strong>Email:</strong> support@ecomweb.com
          </p>
          <p>
            <strong>Phone:</strong> +1-234-567-8900
          </p>
        </div>
      </section>
    </main>
  );
};

export default Home;
