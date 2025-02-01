import React, { useEffect, useState } from "react";
import axios from "axios";

const Navbar = ({ onSelectCategory }) => {
  const getInitialTheme = () => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme ? storedTheme : "light-theme";
  };

  const [theme, setTheme] = useState(getInitialTheme());
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/products");
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = async (value) => {
    setInput(value);
    if (value.length >= 1) {
      setShowSearchResults(true);
      try {
        const response = await axios.get(
          `http://localhost:8081/api/product/search?keyword=${value}`
        );
        setSearchResults(response.data);
        setNoResults(response.data.length === 0);
      } catch (error) {
        console.error("Error searching:", error);
      }
    } else {
      setShowSearchResults(false);
      setSearchResults([]);
      setNoResults(false);
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark-theme" ? "light-theme" : "dark-theme";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const categories = [
    "Laptop",
    "Headphone",
    "Mobile",
    "Electronics",
    "Toys",
    "Fashion",
  ];

  const navbarStyle = {
    backgroundColor: theme === "dark-theme" ? "#1a1a1a" : "#ffffff",
    color: theme === "dark-theme" ? "#ffffff" : "#000000",
    padding: "12px 20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease",
  };

  const textColor = theme === "dark-theme" ? "#ffffff" : "#000000";

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg fixed-top" style={navbarStyle}>
          <div className="container-fluid d-flex align-items-center justify-content-between">
            {/* Brand Name */}
            <a
              className="navbar-brand"
              href="/"
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: textColor,
                textDecoration: "none",
              }}
            >
              E-Com
            </a>

            {/* Navbar Links */}
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav me-auto" style={{ gap: "20px" }}>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="/"
                    style={{
                      color: textColor,
                      textDecoration: "none",
                      fontSize: "16px",
                      fontWeight: "500",
                    }}
                  >
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="/all-products"
                    style={{
                      color: textColor,
                      textDecoration: "none",
                      fontSize: "16px",
                      fontWeight: "500",
                    }}
                  >
                    All Products
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="/add_product"
                    style={{
                      color: textColor,
                      textDecoration: "none",
                      fontSize: "16px",
                      fontWeight: "500",
                    }}
                  >
                    Add Product
                  </a>
                </li>

                {/* Categories Dropdown */}
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="/"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{
                      color: textColor,
                      textDecoration: "none",
                      fontSize: "16px",
                      fontWeight: "500",
                    }}
                  >
                    Categories
                  </a>
                  <ul
                    className="dropdown-menu"
                    style={{
                      backgroundColor:
                        theme === "dark-theme" ? "#333" : "#ffffff",
                    }}
                  >
                    {categories.map((category) => (
                      <li key={category}>
                        <button
                          className="dropdown-item"
                          onClick={() => onSelectCategory(category)}
                          style={{
                            color:
                              theme === "dark-theme" ? "#ffffff" : "#000000",
                            backgroundColor: "transparent",
                            border: "none",
                            cursor: "pointer",
                            width: "100%",
                            textAlign: "left",
                          }}
                        >
                          {category}
                        </button>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </div>

            {/* Right Section - Search Bar, Theme Toggle, Cart, Login */}
            <div className="d-flex align-items-center" style={{ gap: "20px" }}>
              {/* Search Bar */}
              <div className="position-relative">
                <input
                  className="form-control"
                  type="search"
                  value={input}
                  onChange={(e) => handleChange(e.target.value)}
                  placeholder="Search for products..."
                  aria-label="Search"
                  style={{
                    width: "250px",
                    backgroundColor:
                      theme === "dark-theme" ? "#333" : "#f0f0f0",
                    color: theme === "dark-theme" ? "#ffffff" : "#000000", // Ensure text color is visible
                    padding: "8px 12px",
                    fontSize: "14px",
                    border: "none",
                    borderRadius: "25px",
                    transition: "all 0.3s ease",
                    outline: "none",
                    // Added important to force override any external styles
                    fontWeight: "normal !important",
                  }}
                />

                <style>
                  {`
                    input::placeholder {
                      color: ${
                        theme === "dark-theme" ? "#999" : "#666"
                      } !important; /* Make placeholder text color change explicit */
                      }

                   input {
                         color: ${
                           theme === "dark-theme" ? "#ffffff" : "#000000"
                         } !important; /* Ensure input text color visibility */
                          }
                         `}
                </style>
              </div>

              {/* Theme Toggle Button */}
              <button
                className="theme-btn rounded-circle"
                onClick={toggleTheme}
                aria-label="Toggle theme"
                style={{
                  backgroundColor:
                    theme === "dark-theme" ? "#ffcc00" : "#007bff",
                  color: theme === "dark-theme" ? "#000000" : "#ffffff",
                  padding: "10px",
                  border: "none",
                  fontSize: "18px",
                  cursor: "pointer",
                  borderRadius: "50%",
                  width: "40px",
                  height: "40px",
                  transition: "all 0.3s ease",
                }}
              >
                {theme === "dark-theme" ? (
                  <i className="bi bi-moon-fill"></i>
                ) : (
                  <i className="bi bi-sun-fill"></i>
                )}
              </button>

              {/* Cart Button */}
              <a
                href="/cart"
                className="nav-link"
                style={{
                  fontSize: "18px",
                  color: textColor,
                  textDecoration: "none",
                }}
              >
                <i className="bi bi-cart"></i> Cart
              </a>

              {/* Login Button */}
              <a
                href="/login"
                className="btn"
                style={{
                  backgroundColor:
                    theme === "dark-theme" ? "#ffcc00" : "#007bff",
                  color: theme === "dark-theme" ? "#000000" : "#ffffff",
                  padding: "8px 16px",
                  borderRadius: "25px",
                }}
              >
                Login / Signup
              </a>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
