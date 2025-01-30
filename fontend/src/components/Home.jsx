// import React, { useContext, useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import AppContext from "../Context/Context";
// import unplugged from "../assets/unplugged.png"

// const Home = ({ selectedCategory }) => {
//   const { data, isError, addToCart, refreshData } = useContext(AppContext);
//   const [products, setProducts] = useState([]);
//   const [isDataFetched, setIsDataFetched] = useState(false);

//   useEffect(() => {
//     if (!isDataFetched) {
//       refreshData();
//       setIsDataFetched(true);
//     }
//   }, [refreshData, isDataFetched]);

//   useEffect(() => {
//     if (data && data.length > 0) {
//       const fetchImagesAndUpdateProducts = async () => {
//         const updatedProducts = await Promise.all(
//           data.map(async (product) => {
//             try {
//               const response = await axios.get(
//                 `http://localhost:8081/api/product/${product.id}/image`,
//                 { responseType: "blob" }
//               );
//               const imageUrl = URL.createObjectURL(response.data);
//               return { ...product, imageUrl };
//             } catch (error) {
//               console.error(
//                 "Error fetching image for product ID:",
//                 product.id,
//                 error
//               );
//               return { ...product, imageUrl: "placeholder-image-url" };
//             }
//           })
//         );
//         setProducts(updatedProducts);
//       };
//       fetchImagesAndUpdateProducts();
//     }
//   }, [data]);

//   const filteredProducts = selectedCategory
//     ? products.filter((product) => product.category === selectedCategory)
//     : products;

//   if (isError) {
//     return (
//       <h2 className="text-center" style={{ padding: "18rem" }}>
//       <img src={unplugged} alt="Error" style={{ width: '100px', height: '100px' }}/>
//       </h2>
//     );
//   }
//   return (
//     <>
//       <div
//         className="grid"
//         style={{
//           marginTop: "64px",
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
//           gap: "20px",
//           padding: "20px",
//         }}
//       >
//         {filteredProducts.length === 0 ? (
//           <h2
//             className="text-center"
//             style={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//           >
//             No Products Available
//           </h2>
//         ) : (
//           filteredProducts.map((product) => {
//             const { id, brand, name, price, productAvailable, imageUrl } =
//               product;
//               console.log("Filtered Products:", filteredProducts);
//             const cardStyle = {
//               width: "18rem",
//               height: "12rem",
//               boxShadow: "rgba(0, 0, 0, 0.24) 0px 2px 3px",
//               backgroundColor: productAvailable ? "#fff" : "#ccc",
//             };
//             return (
//               <div
//                 className="card mb-3"
//                 style={{
//                   width: "250px",
//                   height: "360px",
//                   boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
//                   borderRadius: "10px",
//                   overflow: "hidden",
//                   backgroundColor: productAvailable ? "#fff" : "#ccc",
//                   display: "flex",
//                   flexDirection: "column",
//                   justifyContent:'flex-start',
//                   alignItems:'stretch'
//                 }}
//                 key={id}
//               >
//                 <Link
//                   to={`/product/${id}`}
//                   style={{ textDecoration: "none", color: "inherit" }}
//                 >
//                   <img
//                     src={imageUrl}
//                     alt={name}
//                     style={{
//                       width: "100%",
//                       height: "150px",
//                       objectFit: "cover",
//                       padding: "5px",
//                       margin: "0",
//                       borderRadius: "10px 10px 10px 10px",
//                     }}
//                   />
//                   <div
//                     className="card-body"
//                     style={{
//                       flexGrow: 1,
//                       display: "flex",
//                       flexDirection: "column",
//                       justifyContent: "space-between",
//                       padding: "10px",
//                     }}
//                   >
//                     <div>
//                       <h5
//                         className="card-title"
//                         style={{ margin: "0 0 10px 0", fontSize: "1.2rem" }}
//                       >
//                         {name.toUpperCase()}
//                       </h5>
//                       <i
//                         className="card-brand"
//                         style={{ fontStyle: "italic", fontSize: "0.8rem" }}
//                       >
//                         {"~ " + brand}
//                       </i>
//                     </div>
//                     <hr className="hr-line" style={{ margin: "10px 0" }} />
//                     <div className="home-cart-price">
//                       <h5
//                         className="card-text"
//                         style={{ fontWeight: "600", fontSize: "1.1rem",marginBottom:'5px' }}
//                       >
//                         <i class="bi bi-currency-rupee"></i>
//                         {price}
//                       </h5>
//                     </div>
//                     <button
//                       className="btn-hover color-9"
//                       style={{margin:'10px 25px 0px '  }}
//                       onClick={(e) => {
//                         e.preventDefault();
//                         addToCart(product);
//                       }}
//                       disabled={!productAvailable}
//                     >
//                       {productAvailable ? "Add to Cart" : "Out of Stock"}
//                     </button>
//                   </div>
//                 </Link>
//               </div>
//             );
//           })
//         )}
//       </div>
//     </>
//   );
// };

// export default Home;

// UPDATED CODE

// src/components/Home.js

// import React, { useEffect, useState } from "react";
// import "../Home.css";

// const Home = () => {
//   const [timeLeft, setTimeLeft] = useState("");

//   // Countdown timer logic
//   useEffect(() => {
//     const countdown = () => {
//       const targetTime = new Date().getTime() + 12 * 60 * 60 * 1000; // 12 hours from now
//       const interval = setInterval(() => {
//         const now = new Date().getTime();
//         const difference = targetTime - now;

//         if (difference <= 0) {
//           clearInterval(interval);
//           setTimeLeft("Offer expired!");
//         } else {
//           const hours = Math.floor(
//             (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
//           );
//           const minutes = Math.floor(
//             (difference % (1000 * 60 * 60)) / (1000 * 60)
//           );
//           const seconds = Math.floor((difference % (1000 * 60)) / 1000);
//           setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
//         }
//       }, 1000);
//       return () => clearInterval(interval);
//     };
//     countdown();
//   }, []);

//   return (
//     <main className="home">
//       {/* Hero Section */}
//       <section className="hero">
//         <div className="hero-overlay">
//           <h1 className="hero-text">Free Shipping Ends In:</h1>
//           <h2 className="timer">{timeLeft}</h2>
//         </div>
//       </section>

//       {/* Categories Section */}
//       <section className="categories">
//         <h2 className="section-title">Shop by Categories</h2>
//         <div className="category-grid">
//           <div className="category-card">
//             <img src="/Images/Acessaries.jpg" alt="Electronics" />
//             <p>Electronics</p>
//             <p className="category-description">
//               Explore the latest gadgets, smartphones, and accessories.
//             </p>
//           </div>
//           <div className="category-card">
//             <img src="/Images/Clothing.jpg" alt="Fashion" />
//             <p>Fashion</p>
//             <p className="category-description">
//               Trendy clothes for every season and occasion.
//             </p>
//           </div>
//           <div className="category-card">
//             <img src="/Images/HomeAplience.jpg" alt="Home Appliances" />
//             <p>Home Appliances</p>
//             <p className="category-description">
//               Discover smart home appliances to simplify your life.
//             </p>
//           </div>
//           <div className="category-card">
//             <img src="/Images/BeautyProduct.jpg" alt="Beauty" />
//             <p>Beauty</p>
//             <p className="category-description">
//               Premium beauty products to enhance your glow.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Featured Products Section */}
//       <section className="featured-products">
//         <h2 className="section-title">Featured Products</h2>
//         <div className="product-grid">
//           <div className="product-card">
//             <img src="/Images/SmartPhones.jpg" alt="Smartphone" />
//             <p>Smartphone</p>
//             <button>View More</button>
//           </div>
//           <div className="product-card">
//             <img src="/Images/Gaming.jpg" alt="Gaming Laptop" />
//             <p>Gaming Laptop</p>
//             <button>View More</button>
//           </div>
//           <div className="product-card">
//             <img src="/Images/HeadPhone.jpg" alt="Headphones" />
//             <p>Headphones</p>
//             <button>View More</button>
//           </div>
//           <div className="product-card">
//             <img src="/Images/SmartWatch.jpg" alt="Smartwatch" />
//             <p>Smartwatch</p>
//             <button>View More</button>
//           </div>
//         </div>
//       </section>

//       {/* Customer Query and Contact Us */}
//       <section className="customer-query">
//         <h2 className="section-title">Customer Query</h2>
//         <div className="query-list">
//           <div className="query-card">
//             <h3>John Doe</h3>
//             <p>"What is the return policy for electronics?"</p>
//             <p>
//               <strong>Answer:</strong> You can return electronics within 30
//               days.
//             </p>
//           </div>
//           <div className="query-card">
//             <h3>Jane Smith</h3>
//             <p>"How long does shipping take?"</p>
//             <p>
//               <strong>Answer:</strong> Standard shipping takes 3-5 business
//               days.
//             </p>
//           </div>
//         </div>
//         <h2 className="section-title">Contact Us</h2>
//         <div className="contact-details">
//           <p>
//             <strong>Email:</strong> support@ecomweb.com
//           </p>
//           <p>
//             <strong>Phone:</strong> +1-234-567-8900
//           </p>
//         </div>
//       </section>
//     </main>
//   );
// };

// export default Home;

// +++++++++++++++++++++++++++++++++++++++++++

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
