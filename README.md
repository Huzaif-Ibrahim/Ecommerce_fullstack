# E-Commerce Website (MERN Stack)

A full-stack e-commerce web application built using the **MERN stack**, featuring **role-based authentication (User & Admin)**, **admin dashboard**, and **Razorpay** integration for secure online payments.

---

## 🚀 Features

### 👤 Authentication & Authorization
- User authentication (signup & login)
- Role-based access control:
  - **User**: browse products, manage cart, place orders
  - **Admin**: manage products, orders, and users via the **Admin Dashboard**
- Protected routes based on user roles

### 🛒 E-Commerce Functionality
- Product listing and product details
- Add to cart and cart management
- Order placement and order history

### 🖥️ Admin Dashboard
- View and manage all products
- Approve, edit, or delete orders
- Moderate users and comments (if applicable)
- Full control over platform content via a dedicated dashboard

### 💳 Payments
- Secure online payments using **Razorpay**
- Backend order creation before payment
- Payment verification using Razorpay signatures

---

## 🛠️ Tech Stack

### Frontend
- React

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose

### Payments
- Razorpay Payment Gateway

---

## 🔐 Role-Based Authentication (RBAC)

- Users are assigned roles (`user` or `admin`)
- Authentication handled using JWT
- Middleware ensures:
  - Only authenticated users can access protected routes
  - Only admins can access admin-specific APIs and the **Admin Dashboard**
- Improves security and mirrors real-world application design

---

## 💳 Razorpay Integration

- Orders are created on the backend before initiating payment
- Razorpay checkout is triggered from the frontend
- Payment verification ensures transaction integrity
- Prevents tampering and fake payment confirmations
