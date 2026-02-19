# Mini ERP System

A robust, full-stack **Mini Enterprise Resource Planning (ERP)** system built with **Node.js**, **Express**, **PostgreSQL**, and **React**. Designed to manage inventory, customers, and orders with role-based access control and transactional data integrity.

## 🚀 Features

- **Role-Based Access Control (RBAC)**: Distinct permissions for **Admin** and **Staff**.
- **Secure Authentication**: JWT-based auth with bcrypt password hashing.
- **Inventory Management**: Real-time stock tracking with transactional updates.
- **Order Processing**: Atomic transactions ensure data consistency (no overselling!).
- **Customer Management**: Maintain a database of customers.
- **Reporting Dashboard**: aggregated insights on revenue, orders, and products.
- **Force Password Change**: Security feature requiring staff to update temporary passwords.

## 🛠️ Tech Stack

### Backend
- **Framework**: Node.js & Express.js
- **Database**: PostgreSQL (Relational Data)
- **ORM**: Prisma (Type-safe database access)
- **Auth**: JSON Web Tokens (JWT) & bcrypt

### Frontend
- **Framework**: React (Vite)
- **State Management**: Context API (AuthContext)
- **Routing**: React Router v6 (Protected Routes)
- **Styling**: Clean, responsive CSS

---

## 📦 Getting Started

### Prerequisites
- **Node.js** (v16+)
- **PostgreSQL** (running locally)

### 1. Database Setup
Create a PostgreSQL database named `mini_erp`:
```sql
CREATE DATABASE mini_erp;
```

### 2. Backend Setup
Navigate to the backend folder:
```bash
cd backend
npm install
```

Configure Environment Variables:
Create a `.env` file in `backend/` based on your PostgreSQL credentials:
```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/mini_erp?schema=public"
JWT_SECRET="your_secure_jwt_secret"
PORT=5000
```
*(Replace `YOUR_PASSWORD` with your actual Postgres password)*

Run Migrations:
```bash
npx prisma migrate dev --name init
```

Start the Server:
```bash
npm run dev
# Server runs on http://localhost:5000
```

### 3. Frontend Setup
Navigate to the frontend folder:
```bash
cd ../frontend
npm install
```

Start the Client:
```bash
npm run dev
# App runs on http://localhost:5173
```





