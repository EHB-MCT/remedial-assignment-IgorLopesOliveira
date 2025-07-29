[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/BhMy8Rjk)

# 🌍 Market Economy Simulation  

## 📌 Overview  
This project is a **web-based economy simulation** where users can buy and sell products in a dynamic market. The prices fluctuate automatically based on supply and demand, and all data is stored persistently in a **MongoDB** database.  

### The application integrates:  
- **Node.js + Express** backend with REST API.  
- **MongoDB** as the database.  
- **Frontend** built using vanilla HTML, CSS, and JavaScript.  
- **Chart.js** for visualizing product price history.  
- **Dynamic simulation logic** that updates product prices with every transaction.  

The project follows the challenge requirements by focusing on backend logic, persistent data storage, and real simulation mechanics, without relying on mockups or static demos.

---

## 🎯 Features Implemented  

### ✅ Core Features  
- **User system**: Users have a balance, inventory, and transaction history.  
- **Market system**:  
  - Products with stock levels, max quantity, and dynamic pricing.  
  - **Supply-demand price logic**:  
    - Price increases when stock decreases (buying).  
    - Price decreases when stock increases (selling).  
- **Persistent data**: All data (users, products, transactions, price changes) is stored in MongoDB.  
- **Price history**: Every price change is logged and displayed as a line graph.  
- **Inventory management**: Users can see their inventory and sell items back to the market.  
- **Wallet management**: Users can check their balance and transaction history dynamically.  

### ✅ Frontend  
- Responsive product grid with **flip cards**:  
  - **Front**: Product details, input quantity, buy button.  
  - **Back**: Interactive price history graph.  
- Smooth flip animation (cards can flip back and forth on image click).  
- Clean UI with basic styling (focus on functionality over design).  

### ✅ Backend  
- Built with **Node.js + Express**.  
- **Routes**:  
  - `GET /api/products` → Fetch all products.  
  - `POST /api/market/buy/:productId` → Handle product purchases.  
  - `POST /api/market/sell/:productId` → Handle selling from inventory.  
  - `GET /api/market/price-history/:productId` → Fetch price history for charts.  
  - `GET /api/users/:userId/wallet` → Retrieve user balance and transaction history.  
  - `GET /api/users/:userId/inventory` → Retrieve user inventory.  
- Uses MongoDB models for:  
  - **User** (with balance, inventory, transaction history)  
  - **Product** (with stock, price, maxQuantity)  
  - **Transaction** (logging buys/sells)  
  - **PriceChange** (logging price fluctuations)  

---

## ✅ Price Simulation Logic  
The simulation dynamically adjusts prices based on market activity:  
- **Buying a product**:  
  - Reduces stock.  
  - Price increases proportionally to stock shortage (up to +10% per transaction).  
- **Selling a product**:  
  - Increases stock.  
  - Price decreases proportionally to stock abundance (up to -10% per transaction).  

All changes are logged in the **PriceChange** collection and reflected in the chart.

---

## 🔒 Security Measures  
- Environment variables (`.env`) are used for sensitive data like MongoDB credentials.  
- `.env` is now added to `.gitignore` to prevent leaking secrets.  
- During development, a `.env` file was accidentally pushed, triggering GitGuardian.  
  - ✅ The secret was **rotated**.  
  - ✅ `.env` is no longer tracked in Git.  
  - ✅ Best practices were applied to secure credentials.  

---

## 🛠️ Tech Stack  
- **Backend**: Node.js, Express  
- **Database**: MongoDB  
- **Frontend**: HTML, CSS, JavaScript  
- **Charting**: Chart.js  
- **Version Control**: Git, GitHub (with feature branches and commits)  

---

## 🧠 Development Process  
- Followed **feature-branch workflow** (e.g., `feature-price-graph` → `main`).  
- Used AI assistance:  
  - **ChatGPT**, **Claude**, and **Copilot** were used to generate functions, debug issues, and refactor code.  
  - Code was manually assembled, integrated, and adapted to meet project requirements.  
- Applied **clean coding practices**:  
  - Clear naming conventions.  
  - Separation of concerns (routes, models, frontend).  
  - Documentation of core logic.  

---

## 📂 Project Structure  
```bash
backend/
 ├─ config/
 │   ├─ connectDB.js
 ├─ models/
 │   ├─ Product.js
 │   ├─ User.js
 │   ├─ Transaction.js
 │   └─ PriceChange.js
 ├─ routes/
 │   └─ marketRoutes.js      # Core API routes
 │   ├─ productRoutes.js
 │   └─ userRoutes.js
 ├─ .env               # MongoDB credentials (ignored in git)
 └─ server.js          # Express app entry point
 └─ seed.js 

frontend/
 ├─ index.html         # Main UI
 ├─ index.css          # Styling
 └─ script.js          # Frontend logic (included inline in index.html)

