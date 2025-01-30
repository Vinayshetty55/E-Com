// import { useState } from "react";
// import axios from "axios";

// const LoginSignup = () => {
//   const [formData, setFormData] = useState({ username: "", password: "" });
//   const [isLogin, setIsLogin] = useState(true);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const endpoint = isLogin
//         ? "http://localhost:8081/api/auth/login"
//         : "http://localhost:8081/api/auth/register";
//       const response = await axios.post(endpoint, formData);
//       setSuccess(isLogin ? "Login successful!" : "Registration successful!");
//       setError("");
//       if (isLogin) localStorage.setItem("token", response.data); // Save JWT token
//     } catch (err) {
//       setError(err.response ? err.response.data : "An error occurred");
//       setSuccess("");
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.formContainer}>
//         <h2 style={styles.header}>{isLogin ? "Login" : "Sign Up"}</h2>
//         <form onSubmit={handleSubmit}>
//           <div style={styles.inputGroup}>
//             <label style={styles.label} htmlFor="username">
//               Username
//             </label>
//             <input
//               type="text"
//               id="username"
//               name="username"
//               value={formData.username}
//               onChange={handleInputChange}
//               style={styles.input}
//             />
//           </div>
//           <div style={styles.inputGroup}>
//             <label style={styles.label} htmlFor="password">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleInputChange}
//               style={styles.input}
//             />
//           </div>
//           {error && <p style={styles.error}>{error}</p>}
//           {success && <p style={styles.success}>{success}</p>}
//           <button type="submit" style={styles.submitButton}>
//             {isLogin ? "Login" : "Sign Up"}
//           </button>
//         </form>
//         <div style={styles.toggleContainer}>
//           <p>
//             {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
//             <button
//               type="button"
//               onClick={() => {
//                 setIsLogin(!isLogin);
//                 setError("");
//                 setSuccess("");
//               }}
//               style={styles.toggleButton}
//             >
//               {isLogin ? "Sign Up" : "Login"}
//             </button>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     /* Styles */
//   },
//   formContainer: {
//     /* Styles */
//   },
//   // Add styles here
// };

// export default LoginSignup;

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Ensure you have React Router installed and set up

const LoginSignup = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const endpoint = isLogin
        ? "http://localhost:8081/api/auth/login"
        : "http://localhost:8081/api/auth/register";

      // Only send the required data for login/signup
      const payload = isLogin
        ? { username: formData.username, password: formData.password }
        : formData;

      const response = await axios.post(endpoint, payload);
      setSuccess(isLogin ? "Login successful!" : "Registration successful!");
      setError("");
      localStorage.setItem("token", response.data); // Save JWT token
      alert(isLogin ? "Logged in successfully!" : "Signed up successfully!");
      navigate("/"); // Redirect to the home page
    } catch (err) {
      setError(err.response ? err.response.data : "An error occurred");
      setSuccess("");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.header}>{isLogin ? "Login" : "Sign Up"}</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              style={styles.input}
              required
            />
          </div>
          {!isLogin && (
            <div style={styles.inputGroup}>
              <label style={styles.label} htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                style={styles.input}
                required
              />
            </div>
          )}
          {error && <p style={styles.error}>{error}</p>}
          {success && <p style={styles.success}>{success}</p>}
          <button type="submit" style={styles.submitButton}>
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <div style={styles.toggleContainer}>
          <p>
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
                setSuccess("");
                setFormData({ username: "", password: "", email: "" }); // Reset form fields
              }}
              style={styles.toggleButton}
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  card: {
    width: "400px",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    backgroundColor: "#ffffff",
    textAlign: "center",
  },
  header: {
    fontSize: "24px",
    marginBottom: "20px",
    color: "#333333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
  },
  label: {
    marginBottom: "5px",
    fontWeight: "bold",
    fontSize: "14px",
    color: "#555555",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #cccccc",
    fontSize: "16px",
  },
  submitButton: {
    padding: "10px 15px",
    borderRadius: "5px",
    backgroundColor: "#4CAF50",
    color: "#ffffff",
    fontSize: "16px",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  toggleContainer: {
    marginTop: "15px",
  },
  toggleButton: {
    backgroundColor: "transparent",
    border: "none",
    color: "#007BFF",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    fontSize: "14px",
  },
  success: {
    color: "green",
    fontSize: "14px",
  },
};

export default LoginSignup;
