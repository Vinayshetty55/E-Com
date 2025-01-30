// import React, { useEffect, useState } from "react";
// import Home from "./Home"
// import axios from "axios";
// // import { json } from "react-router-dom";
// // import { BiSunFill, BiMoon } from "react-icons/bi";

// const Navbar = ({ onSelectCategory, onSearch }) => {
//   const getInitialTheme = () => {
//     const storedTheme = localStorage.getItem("theme");
//     return storedTheme ? storedTheme : "light-theme";
//   };
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [theme, setTheme] = useState(getInitialTheme());
//   const [input, setInput] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [noResults, setNoResults] = useState(false);
//   const [searchFocused, setSearchFocused] = useState(false);
//   const [showSearchResults,setShowSearchResults] = useState(false)
//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async (value) => {
//     try {
//       const response = await axios.get("http://localhost:8081/api/products");
//       setSearchResults(response.data);
//       console.log(response.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const handleChange = async (value) => {
//     setInput(value);
//     if (value.length >= 1) {
//       setShowSearchResults(true)
//     try {
//       const response = await axios.get(
//         `http://localhost:8081/api/products/search?keyword=${value}`
//       );
//       setSearchResults(response.data);
//       setNoResults(response.data.length === 0);
//       console.log(response.data);
//     } catch (error) {
//       console.error("Error searching:", error);
//     }
//     } else {
//       setShowSearchResults(false);
//       setSearchResults([]);
//       setNoResults(false);
//     }
//   };

//   // const handleChange = async (value) => {
//   //   setInput(value);
//   //   if (value.length >= 1) {
//   //     setShowSearchResults(true);
//   //     try {
//   //       let response;
//   //       if (!isNaN(value)) {
//   //         // Input is a number, search by ID
//   //         response = await axios.get(`http://localhost:8080/api/products/search?id=${value}`);
//   //       } else {
//   //         // Input is not a number, search by keyword
//   //         response = await axios.get(`http://localhost:8080/api/products/search?keyword=${value}`);
//   //       }

//   //       const results = response.data;
//   //       setSearchResults(results);
//   //       setNoResults(results.length === 0);
//   //       console.log(results);
//   //     } catch (error) {
//   //       console.error("Error searching:", error.response ? error.response.data : error.message);
//   //     }
//   //   } else {
//   //     setShowSearchResults(false);
//   //     setSearchResults([]);
//   //     setNoResults(false);
//   //   }
//   // };

//   const handleCategorySelect = (category) => {
//     setSelectedCategory(category);
//     onSelectCategory(category);
//   };
//   const toggleTheme = () => {
//     const newTheme = theme === "dark-theme" ? "light-theme" : "dark-theme";
//     setTheme(newTheme);
//     localStorage.setItem("theme", newTheme);
//   };

//   useEffect(() => {
//     document.body.className = theme;
//   }, [theme]);

//   const categories = [
//     "Laptop",
//     "Headphone",
//     "Mobile",
//     "Electronics",
//     "Toys",
//     "Fashion",
//   ];
//   return (
//     <>
//       <header>
//         <nav className="navbar navbar-expand-lg fixed-top">
//           <div className="container-fluid">
//             <a className="navbar-brand" href="/">
//                 E-Com
//             </a>
//             <button
//               className="navbar-toggler"
//               type="button"
//               data-bs-toggle="collapse"
//               data-bs-target="#navbarSupportedContent"
//               aria-controls="navbarSupportedContent"
//               aria-expanded="false"
//               aria-label="Toggle navigation"
//             >
//               <span className="navbar-toggler-icon"></span>
//             </button>
//             <div
//               className="collapse navbar-collapse"
//               id="navbarSupportedContent"
//             >
//               <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//                 <li className="nav-item">
//                   <a className="nav-link active" aria-current="page" href="/">
//                     Home
//                   </a>
//                 </li>
//                 <li className="nav-item">
//                   <a className="nav-link" href="/add_product">
//                     Add Product
//                   </a>
//                 </li>

//                 <li className="nav-item dropdown">
//                   <a
//                     className="nav-link dropdown-toggle"
//                     href="/"
//                     role="button"
//                     data-bs-toggle="dropdown"
//                     aria-expanded="false"
//                   >
//                     Categories
//                   </a>

//                   <ul className="dropdown-menu">
//                     {categories.map((category) => (
//                       <li key={category}>
//                         <button
//                           className="dropdown-item"
//                           onClick={() => handleCategorySelect(category)}
//                         >
//                           {category}
//                         </button>
//                       </li>
//                     ))}
//                   </ul>
//                 </li>

//                 <li className="nav-item"></li>
//               </ul>
//               <button className="theme-btn" onClick={() => toggleTheme()}>
//                 {theme === "dark-theme" ? (
//                   <i className="bi bi-moon-fill"></i>
//                 ) : (
//                   <i className="bi bi-sun-fill"></i>
//                 )}
//               </button>
//               <div className="d-flex align-items-center cart">
//                 <a href="/cart" className="nav-link text-dark">
//                   <i
//                     className="bi bi-cart me-2"
//                     style={{ display: "flex", alignItems: "center" }}
//                   >
//                     Cart
//                   </i>
//                 </a>
//                 {/* <form className="d-flex" role="search" onSubmit={handleSearch} id="searchForm"> */}
//                 <input
//                   className="form-control me-2"
//                   type="search"
//                   placeholder="Search"
//                   aria-label="Search"
//                   value={input}
//                   onChange={(e) => handleChange(e.target.value)}
//                   onFocus={() => setSearchFocused(true)} // Set searchFocused to true when search bar is focused
//                   onBlur={() => setSearchFocused(false)} // Set searchFocused to false when search bar loses focus
//                 />
//                 {showSearchResults && (
//                   <ul className="list-group">
//                     {searchResults.length > 0 ? (
//                         searchResults.map((result) => (
//                           <li key={result.id} className="list-group-item">
//                             <a href={`/product/${result.id}`} className="search-result-link">
//                             <span>{result.name}</span>
//                             </a>
//                           </li>
//                         ))
//                     ) : (
//                       noResults && (
//                         <p className="no-results-message">
//                           No Prouduct with such Name
//                         </p>
//                       )
//                     )}
//                   </ul>
//                 )}
//                 {/* <button
//                   className="btn btn-outline-success"
//                   onClick={handleSearch}
//                 >
//                   Search Products
//                 </button> */}
//                 {/* </form> */}
//                 <div />
//               </div>
//             </div>
//           </div>
//         </nav>
//       </header>
//     </>
//   );
// };

// export default Navbar;

// Second Code

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Navbar = ({ onSelectCategory }) => {
//   const getInitialTheme = () => {
//     const storedTheme = localStorage.getItem("theme");
//     return storedTheme ? storedTheme : "light-theme";
//   };

//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [theme, setTheme] = useState(getInitialTheme());
//   const [input, setInput] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [noResults, setNoResults] = useState(false);
//   const [searchFocused, setSearchFocused] = useState(false);
//   const [showSearchResults, setShowSearchResults] = useState(false);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get("http://localhost:8081/api/products");
//       setSearchResults(response.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const handleChange = async (value) => {
//     setInput(value);
//     if (value.length >= 1) {
//       setShowSearchResults(true);
//       try {
//         const response = await axios.get(
//           `http://localhost:8081/api/products/search?keyword=${value}`
//         );
//         setSearchResults(response.data);
//         setNoResults(response.data.length === 0);
//       } catch (error) {
//         console.error("Error searching:", error);
//       }
//     } else {
//       setShowSearchResults(false);
//       setSearchResults([]);
//       setNoResults(false);
//     }
//   };

//   const handleCategorySelect = (category) => {
//     setSelectedCategory(category);
//     onSelectCategory(category);
//   };

//   const toggleTheme = () => {
//     const newTheme = theme === "dark-theme" ? "light-theme" : "dark-theme";
//     setTheme(newTheme);
//     localStorage.setItem("theme", newTheme);
//   };

//   useEffect(() => {
//     document.body.className = theme;
//   }, [theme]);

//   const categories = [
//     "Laptop",
//     "Headphone",
//     "Mobile",
//     "Electronics",
//     "Toys",
//     "Fashion",
//   ];

//   return (
//     <header>
//       <nav className="navbar navbar-expand-lg fixed-top">
//         <div className="container-fluid">
//           <a className="navbar-brand" href="/">E-Com</a>
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarSupportedContent"
//             aria-controls="navbarSupportedContent"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div className="collapse navbar-collapse" id="navbarSupportedContent">
//             <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//               <li className="nav-item">
//                 <a className="nav-link active" aria-current="page" href="/">Home</a>
//               </li>
//               <li className="nav-item">
//                 <a className="nav-link" href="/add_product">Add Product</a>
//               </li>
//               <li className="nav-item dropdown">
//                 <a
//                   className="nav-link dropdown-toggle"
//                   href="/"
//                   role="button"
//                   data-bs-toggle="dropdown"
//                   aria-expanded="false"
//                 >
//                   Categories
//                 </a>
//                 <ul className="dropdown-menu">
//                   {categories.map((category) => (
//                     <li key={category}>
//                       <button
//                         className="dropdown-item"
//                         onClick={() => handleCategorySelect(category)}
//                       >
//                         {category}
//                       </button>
//                     </li>
//                   ))}
//                 </ul>
//               </li>
//             </ul>
//             <button className="theme-btn" onClick={toggleTheme}>
//               {theme === "dark-theme" ? (
//                 <i className="bi bi-moon-fill"></i>
//               ) : (
//                 <i className="bi bi-sun-fill"></i>
//               )}
//             </button>
//             <div className="d-flex align-items-center cart">
//               <a href="/cart" className="nav-link text-dark">
//                 <i className="bi bi-cart me-2">Cart</i>
//               </a>
//               <input
//                 className="form-control me-2"
//                 type="search"
//                 placeholder="Search"
//                 value={input}
//                 onChange={(e) => handleChange(e.target.value)}
//                 onFocus={() => setSearchFocused(true)}
//                 onBlur={() => setSearchFocused(false)}
//               />
//               {showSearchResults && (
//                 <ul className="list-group">
//                   {searchResults.length > 0 ? (
//                     searchResults.map((result) => (
//                       <li key={result.id} className="list-group-item">
//                         <a href={`/product/${result.id}`} className="search-result-link">
//                           <span>{result.name}</span>
//                         </a>
//                       </li>
//                     ))
//                   ) : (
//                     noResults && <p className="no-results-message">No Product with such Name</p>
//                   )}
//                 </ul>
//               )}
//             </div>
//           </div>
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Navbar;

//+++++++++++++++++  Version 2  ++++++++++++++++++

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Navbar = ({ onSelectCategory }) => {
//   const getInitialTheme = () => {
//     const storedTheme = localStorage.getItem("theme");
//     return storedTheme ? storedTheme : "light-theme";
//   };

//   const [theme, setTheme] = useState(getInitialTheme());
//   const [input, setInput] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [noResults, setNoResults] = useState(false);
//   const [showSearchResults, setShowSearchResults] = useState(false);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get("http://localhost:8081/api/products");
//       setSearchResults(response.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const handleChange = async (value) => {
//     setInput(value);
//     if (value.length >= 1) {
//       setShowSearchResults(true);
//       try {
//         const response = await axios.get(
//           `http://localhost:8081/api/products/search?keyword=${value}`
//         );
//         setSearchResults(response.data);
//         setNoResults(response.data.length === 0);
//       } catch (error) {
//         console.error("Error searching:", error);
//       }
//     } else {
//       setShowSearchResults(false);
//       setSearchResults([]);
//       setNoResults(false);
//     }
//   };

//   const toggleTheme = () => {
//     const newTheme = theme === "dark-theme" ? "light-theme" : "dark-theme";
//     setTheme(newTheme);
//     localStorage.setItem("theme", newTheme);
//   };

//   useEffect(() => {
//     document.body.className = theme;
//   }, [theme]);

//   const categories = [
//     "Laptop",
//     "Headphone",
//     "Mobile",
//     "Electronics",
//     "Toys",
//     "Fashion",
//   ];

//   return (
//     <>
//       <header>
//         <nav className="navbar navbar-expand-lg fixed-top">
//           <div className="container-fluid">
//             <a className="navbar-brand" href="/">
//               E-Com
//             </a>
//             <button
//               className="navbar-toggler"
//               type="button"
//               data-bs-toggle="collapse"
//               data-bs-target="#navbarSupportedContent"
//               aria-controls="navbarSupportedContent"
//               aria-expanded="false"
//               aria-label="Toggle navigation"
//             >
//               <span className="navbar-toggler-icon"></span>
//             </button>
//             <div
//               className="collapse navbar-collapse"
//               id="navbarSupportedContent"
//             >
//               <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//                 <li className="nav-item">
//                   <a className="nav-link active" aria-current="page" href="/">
//                     Home
//                   </a>
//                 </li>
//                 <li className="nav-item">
//                   <a className="nav-link" href="/all-products">
//                     All Products
//                   </a>
//                 </li>
//                 <li className="nav-item">
//                   <a className="nav-link" href="/add_product">
//                     Add Product
//                   </a>
//                 </li>
//                 <li className="nav-item dropdown">
//                   <a
//                     className="nav-link dropdown-toggle"
//                     href="/"
//                     role="button"
//                     data-bs-toggle="dropdown"
//                     aria-expanded="false"
//                   >
//                     Categories
//                   </a>
//                   <ul className="dropdown-menu">
//                     {categories.map((category) => (
//                       <li key={category}>
//                         <button
//                           className="dropdown-item"
//                           onClick={() => onSelectCategory(category)}
//                         >
//                           {category}
//                         </button>
//                       </li>
//                     ))}
//                   </ul>
//                 </li>
//                 <div className="d-flex align-items-center ms-2 position-relative">
//                   <input
//                     className="form-control"
//                     type="search"
//                     placeholder="Search"
//                     aria-label="Search"
//                     value={input}
//                     onChange={(e) => handleChange(e.target.value)}
//                     style={{ width: "200px" }}
//                   />
//                   {showSearchResults && (
//                     <ul className="list-group position-absolute">
//                       {searchResults.length > 0
//                         ? searchResults.map((result) => (
//                             <li key={result.id} className="list-group-item">
//                               <a
//                                 href={`/product/${result.id}`}
//                                 className="search-result-link"
//                               >
//                                 <span>{result.name}</span>
//                               </a>
//                             </li>
//                           ))
//                         : noResults && (
//                             <p className="no-results-message">
//                               No Product with such Name
//                             </p>
//                           )}
//                     </ul>
//                   )}
//                 </div>
//               </ul>
//               <button
//                 className="theme-btn"
//                 onClick={toggleTheme}
//                 aria-label="Toggle theme"
//               >
//                 {theme === "dark-theme" ? (
//                   <i className="bi bi-moon-fill"></i>
//                 ) : (
//                   <i className="bi bi-sun-fill"></i>
//                 )}
//               </button>
//               <a href="/cart" className="nav-link text-dark">
//                 <i className="bi bi-cart me-2">Cart</i>
//               </a>
//               <a
//                 href="/login"
//                 className="nav-link text-white"
//                 style={{
//                   marginLeft: "10px",
//                   textDecoration: "none",
//                   padding: "5px 10px",
//                   borderRadius: "5px",
//                 }}
//               >
//                 Login/Signup
//               </a>
//             </div>
//           </div>
//         </nav>
//       </header>
//     </>
//   );
// };

// export default Navbar;

// ++++++++++++++++ Version 3 +++++++++++++++++++++

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
          `http://localhost:8081/api/products/search?keyword=${value}`
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

  const navbarStyle =
    theme === "dark-theme" ? darkNavbarStyle : lightNavbarStyle;
  const buttonStyle =
    theme === "dark-theme" ? darkButtonStyle : lightButtonStyle;

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg fixed-top" style={navbarStyle}>
          <div className="container-fluid">
            <a
              className="navbar-brand"
              href="/"
              style={{
                fontFamily: "Arial, sans-serif",
                fontSize: "24px",
                color: theme === "dark-theme" ? "white" : "black",
              }}
            >
              E-Com
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
              style={{
                backgroundColor: theme === "dark-theme" ? "#444" : "#007bff",
              }}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    aria-current="page"
                    href="/"
                    style={{
                      fontSize: "16px",
                      color: theme === "dark-theme" ? "white" : "black",
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
                      fontSize: "16px",
                      color: theme === "dark-theme" ? "white" : "black",
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
                      fontSize: "16px",
                      color: theme === "dark-theme" ? "white" : "black",
                    }}
                  >
                    Add Product
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="/"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{
                      fontSize: "16px",
                      color: theme === "dark-theme" ? "white" : "black",
                    }}
                  >
                    Categories
                  </a>
                  <ul className="dropdown-menu">
                    {categories.map((category) => (
                      <li key={category}>
                        <button
                          className="dropdown-item"
                          onClick={() => onSelectCategory(category)}
                          style={{
                            color: theme === "dark-theme" ? "black" : "black",
                          }}
                        >
                          {category}
                        </button>
                      </li>
                    ))}
                  </ul>
                </li>
                <div className="d-flex align-items-center ms-2 position-relative">
                  <input
                    className="form-control"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={input}
                    onChange={(e) => handleChange(e.target.value)}
                    style={{
                      width: "250px",
                      backgroundColor: theme === "dark-theme" ? "#333" : "#fff",
                      color: theme === "dark-theme" ? "white" : "black",
                      padding: "8px 12px",
                      fontSize: "14px",
                    }}
                  />
                  {showSearchResults && (
                    <ul
                      className="list-group position-absolute"
                      style={{
                        backgroundColor:
                          theme === "dark-theme" ? "#444" : "#fff",
                      }}
                    >
                      {searchResults.length > 0
                        ? searchResults.map((result) => (
                            <li
                              key={result.id}
                              className="list-group-item"
                              style={{
                                color:
                                  theme === "dark-theme" ? "white" : "black",
                              }}
                            >
                              <a
                                href={`/product/${result.id}`}
                                className="search-result-link"
                                style={{
                                  color:
                                    theme === "dark-theme" ? "white" : "black",
                                }}
                              >
                                <span>{result.name}</span>
                              </a>
                            </li>
                          ))
                        : noResults && (
                            <p
                              className="no-results-message"
                              style={{
                                color:
                                  theme === "dark-theme" ? "white" : "black",
                              }}
                            >
                              No Product with such Name
                            </p>
                          )}
                    </ul>
                  )}
                </div>
              </ul>
              <button
                className="theme-btn rounded-circle"
                onClick={toggleTheme}
                aria-label="Toggle theme"
                style={buttonStyle}
              >
                {theme === "dark-theme" ? (
                  <i className="bi bi-moon-fill"></i>
                ) : (
                  <i className="bi bi-sun-fill"></i>
                )}
              </button>
              <a
                href="/cart"
                className="nav-link text-dark"
                style={{
                  color: theme === "dark-theme" ? "white" : "black",
                  fontSize: "16px",
                }}
              >
                <i className="bi bi-cart me-2">Cart</i>
              </a>
              <a
                href="/login"
                className="nav-link text-white"
                style={{
                  marginLeft: "10px",
                  textDecoration: "none",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  backgroundColor: theme === "dark-theme" ? "#444" : "#007bff",
                  fontSize: "16px",
                }}
              >
                Login/Signup
              </a>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

// Inline styles for dark and light themes
const darkNavbarStyle = {
  backgroundColor: "#333",
  color: "white",
};

const lightNavbarStyle = {
  backgroundColor: "#fff",
  color: "black",
};

const darkButtonStyle = {
  padding: "8px 12px",
  backgroundColor: "#ffcc00",
  border: "none",
  cursor: "pointer",
  fontSize: "18px",
  borderRadius: "50%",
  transition: "background-color 0.3s",
};

const lightButtonStyle = {
  padding: "8px 12px",
  backgroundColor: "#007bff",
  border: "none",
  cursor: "pointer",
  fontSize: "18px",
  borderRadius: "50%",
  transition: "background-color 0.3s",
};

export default Navbar;
