import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AppContext from "../Context/Context";

const AllProducts = () => {
  const { data, isError, addToCart, refreshData } = useContext(AppContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  useEffect(() => {
    if (data && data.length > 0) {
      const fetchImagesAndUpdateProducts = async () => {
        const updatedProducts = await Promise.all(
          data.map(async (product) => {
            try {
              const response = await axios.get(
                `http://localhost:8081/api/product/${product.id}/image`,
                { responseType: "blob" }
              );
              const imageUrl = URL.createObjectURL(response.data);
              return { ...product, imageUrl };
            } catch (error) {
              console.error(
                "Error fetching image for product ID:",
                product.id,
                error
              );
              return { ...product, imageUrl: "placeholder-image-url" };
            }
          })
        );
        setProducts(updatedProducts);
      };
      fetchImagesAndUpdateProducts();
    }
  }, [data]);

  if (isError) {
    return <h2>Error loading products...</h2>;
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)", // Ensures 4 cards per row
        gap: "20px",
        padding: "20px",
        marginTop: "70px", // Adds space below the navbar
      }}
    >
      {products.map((product) => (
        <div
          key={product.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            padding: "16px",
            textAlign: "center",
            backgroundColor: "#fff",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.05)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform = "scale(1)")
          }
        >
          <Link
            to={`/product/${product.id}`}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              style={{
                width: "90%",
                height: "150px",
                objectFit: "cover",
                borderRadius: "8px",
                marginBottom: "12px",
              }}
            />
            <h4 style={{ fontSize: "16px", margin: "8px 0" }}>
              {product.name}
            </h4>
            <p style={{ fontSize: "14px", color: "#555" }}>₹{product.price}</p>
          </Link>
          <button
            onClick={() => addToCart(product)}
            style={{
              marginTop: "12px",
              padding: "8px 12px",
              fontSize: "14px",
              color: "#fff",
              backgroundColor: "#007bff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#0056b3")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#007bff")
            }
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default AllProducts;
