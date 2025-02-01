## 🛒 E-Commerce Website

This is a **Full-stack E-Commerce website** built using **React.js (Frontend) and Spring Boot (Backend)** with a PostgreSQL database powered by Supabase. The project supports product listing, category-based filtering, user authentication, and cart functionality.



---

## 📌 Features

### 🖥 Frontend (React.js)
✅ Fully responsive UI with a modern Navbar.  
✅ Dark mode & light mode toggle.  
✅ Product search functionality.  
✅ Category-based product filtering.  
✅ Shopping cart integration.  
✅ Login and signup system.  

### 🖥 Backend (Spring Boot)
✅ REST API for products, users, and authentication.  
✅ PostgreSQL database with Supabase integration.  
✅ Secure JWT authentication.  
✅ CRUD operations for product management.  

---

## 🛠 Tech Stack

**Frontend:** React.js, Bootstrap, Axios  
**Backend:** Spring Boot, Spring Security, PostgreSQL  
**Database:** Supabase (PostgreSQL)  
**Authentication:** JWT  

---

## 🚀 Installation & Setup

### 🖥 Backend Setup (Spring Boot)
1. Clone the repository:  
   ```sh
   git clone https://github.com/yourusername/ecommerce-project.git
   cd ecommerce-project/backend
   ```
2. Configure **application.properties** (set up PostgreSQL & Supabase).  
3. Build and run the backend:  
   ```sh
   mvn clean install
   mvn spring-boot:run
   ```
4. API will be available at `http://localhost:8081`.

### 🎨 Frontend Setup (React.js)
1. Navigate to the frontend folder:  
   ```sh
   cd ../frontend
   ```
2. Install dependencies:  
   ```sh
   npm install
   ```
3. Start the development server:  
   ```sh
   npm start
   ```
4. React app runs at `http://localhost:3000`.

---

## 📂 Project Structure

```
ecommerce-project/
│── backend/          # Spring Boot backend
│   ├── src/          # Java source files
│   ├── resources/    # Application properties & static files
│── frontend/         # React frontend
│   ├── src/          # React components & pages
│   ├── public/       # Static assets
│── README.md
│── .gitignore
│── package.json
│── pom.xml
```

---

## 🔒 Environment Variables
Create a `.env` file in the backend and frontend with necessary API keys and database credentials.

---

## 🚀 Future Enhancements
🔹 Payment Gateway Integration  
🔹 Order Tracking System  
🔹 User Reviews & Ratings  
🔹 Admin Panel for Product Management  

---

## 🤝 Contributing
Feel free to contribute by opening issues or pull requests!

---

## 📜 License
[MIT License](LICENSE)  

---
