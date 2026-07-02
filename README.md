# 🍔 Food Ordering System

A full-stack MERN-based Food Ordering System that enables customers to discover restaurants, browse menus, place food orders, make secure online payments, and leave reviews through a modern and responsive web interface. The platform also provides restaurant administrators with a comprehensive dashboard to manage menu items, users, and customer orders.

Built with scalability and usability in mind, the application integrates secure authentication, role-based authorization, map-based location selection, payment processing, cloud image storage, and automated email notifications to deliver a seamless end-to-end food ordering experience.

---

## ✨ Features

### 👤 Authentication & User Management

* Secure user registration and login
* JWT-based authentication and authorization
* Role-Based Access Control (Customer & Admin)
* Duplicate account prevention and input validation
* Admin user management

### 🍽️ Food & Menu Management

* Browse available food items
* Search foods by name
* Filter foods by categories
* View detailed food information
* Add, update, and delete menu items (Admin)
* Upload and manage food images

### 🛒 Cart & Ordering

* Add and remove items from cart
* Review cart before checkout
* Smooth order placement workflow
* View order history

### 📍 Delivery Location

* Interactive map for delivery location selection
* Accurate customer location display using Leaflet

### 💳 Payment & Receipts

* Secure payment integration with **SSLCommerz**
* Generate downloadable PDF payment receipts

### 📧 Email Notifications

* Automatic order confirmation emails via **Mailgun API**

### ⭐ Review System

* Add reviews for purchased food
* Edit existing reviews
* Delete reviews

### 🛠️ Admin Dashboard

* Manage food items
* View registered users
* Remove users when necessary
* View and manage customer orders

### 🔒 Security

* Password hashing with bcrypt
* JWT authentication
* Protected API routes
* Role-based authorization

---

## 🛠️ Tech Stack

| Category            | Technologies                      |
| ------------------- | --------------------------------- |
| **Frontend**        | React.js, HTML5, CSS3, JavaScript |
| **Backend**         | Node.js, Express.js               |
| **Database**        | MongoDB, Mongoose                 |
| **Authentication**  | JWT, bcryptjs                     |
| **Payment Gateway** | SSLCommerz                        |
| **Email Service**   | Mailgun API                       |
| **Cloud Storage**   | Cloudinary                        |
| **File Upload**     | Multer                            |
| **Maps**            | Leaflet                           |
| **PDF Generation**  | jsPDF                             |
| **Version Control** | Git & GitHub                      |

---

## 🚀 Key Highlights

* Responsive and mobile-friendly user interface
* Secure authentication and role-based access control
* Advanced food search and category filtering
* Interactive shopping cart and checkout system
* Secure online payment processing
* Automated email confirmation after successful orders
* Downloadable PDF receipts
* Interactive delivery location selection
* Customer review and feedback system
* Comprehensive admin dashboard for restaurant management

---

## 📂 Project Structure

```text
Food-Ordering-System
│
├── frontend/
│   ├── React Components
│   ├── Pages
│   ├── Context API
│   ├── Services
│   └── Assets
│
├── backend/
│   ├── Controllers
│   ├── Routes
│   ├── Models
│   ├── Middleware
│   ├── Configuration
│   └── APIs
│
└── Database/
    └── MongoDB
```

---

## 📌 Getting Started

### Clone the repository

```bash
git clone https://github.com/Xawad11/food-ordering-system-V1.git
cd food-ordering-system-V1
```

### Install dependencies

Frontend

```bash
cd frontend
npm install
```

Backend

```bash
cd backend
npm install
```

### Configure environment variables

Create a `.env` file inside the backend directory and configure the required environment variables such as:

* MongoDB URI
* JWT Secret
* Cloudinary Credentials
* Mailgun API Credentials
* SSLCommerz Credentials

### Run the application

Backend

```bash
npm run dev
```

Frontend

```bash
npm start
```

---

## 📖 Overview

This project was developed to demonstrate a complete full-stack food ordering platform using the MERN stack. It combines secure authentication, online payment processing, cloud-based image management, automated email notifications, and an intuitive user interface to provide a complete digital food ordering solution for both customers and restaurant administrators.
