# 🏆📚 Book Verse – Ebook Sharing Platform

A modern **full-stack ebook sharing platform** where readers can discover, purchase, and enjoy digital books while empowering writers to publish and manage their own creations. Book Verse provides a secure marketplace with role-based dashboards, seamless payments, and a beautiful responsive user experience.

---

## 🌐 Live URL
> Frontend: https://book-verse-beryl.vercel.app

> Backend: https://book-verse-server-phi.vercel.app
---

# 🎯 Purpose

Book Verse is designed to connect **ebook lovers, readers, collectors, and talented writers** on one platform.

Readers can browse and purchase original ebooks, while verified writers can publish and manage their books after completing a one-time verification payment. Administrators oversee users, books, and transactions to ensure the platform runs smoothly.

---

# ✨ Key Features

### 👤 Authentication & Authorization

* Secure authentication using **Better Auth**
* JWT session management
* Email & Password login
* Google Social Sign-In
* Role-based authorization (Admin, Writer, Reader)

---

### 📖 Reader Features

* Browse all available ebooks
* Search and filter books
* View detailed book information
* Purchase ebooks securely using Stripe
* Bookmark favorite books
* View purchased books
* Update user profile
* Beautiful confetti animation after successful purchase

---

### ✍️ Writer Features

* One-time writer verification payment
* Upload new ebooks
* Edit ebook information
* Publish / Unpublish books
* Delete ebooks
* View sales history
* Track earnings

---

### 🛠️ Admin Features

* Manage all users
* Change user roles
* Manage all ebooks
* Publish / Unpublish books
* Delete inappropriate books
* View all transactions
* Platform analytics dashboard

---

### 💳 Payment System

* Secure Stripe Checkout integration
* Stripe Webhooks
* Automatic transaction tracking
* Purchase history management

---

### 🎨 UI & UX

* Pixel-perfect modern design
* Fully responsive on all devices
* Smooth animations using Framer Motion
* Beautiful Hero UI components
* Toast notifications
* Modern icons
* Fireworks celebration after successful purchases

---

# 🛠️ Tech Stack

## Frontend

* Next.js 16
* React 19
* JavaScript
* Tailwind CSS v4
* Hero UI v3
* Better Auth
* JWT Authentication
* Redux Toolkit
* Redux Persist
* Framer Motion
* UploadThing
* Stripe JS
* Recharts

---

## Backend

* Node.js
* Express.js
* MongoDB
* Stripe
* Better Auth
* JOSE (JWT)
* CORS
* Dotenv

---

# 📦 NPM Packages Used

## Frontend

```txt
@better-auth/mongo-adapter
@gravity-ui/icons
@heroui/react
@heroui/styles
@reduxjs/toolkit
@stripe/stripe-js
@uploadthing/react
better-auth
canvas-confetti
framer-motion
lucide-react
mongodb
next
react
react-dom
react-icons
react-redux
react-toastify
recharts
redux-persist
uploadthing
```

## Backend

```txt
cors
dotenv
express
jose
mongodb
stripe
```

---

# 🚀 Installation & Setup

## 1. Clone the repository

```bash
git clone https://github.com/ZunaidChowdhury/book-verse.git
git clone https://github.com/ZunaidChowdhury/book-verse-server.git
```

---

## 2. Install dependencies

### Frontend

```bash
cd book-verse
npm install
```

### Backend

```bash
cd book-verse-server
npm install
```

---

## 3. Configure Environment Variables

### Frontend (.env.local)

```env
NEXT_PUBLIC_BASE_URL=
NEXT_PUBLIC_SERVER_BASE_URL=

BETTER_AUTH_SECRET=
BETTER_AUTH_URL=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

MONGODB_URI=

UPLOADTHING_TOKEN=

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
```

### Backend (.env)

```env
PORT=

MONGODB_URI=

CLIENT_URL=

STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```

---

## 4. Run the application

### Backend

```bash
npm nodemon index.js
```

### Frontend

```bash
npm run dev
```

---



# 🔒 Authentication

* Better Auth
* JWT Authentication
* Google OAuth Login
* Protected Routes
* Role-Based Access Control

---

# 📈 Core Functionalities

* Ebook Management
* Stripe Payments
* Writer Verification
* Book Purchasing
* Transaction History
* Analytics Dashboard
* Bookmarks
* User Profile Management
* CRUD Operations
* Image Upload
* Responsive UI
* Modern Animations

---

# 👨‍💻 Author

**Zunaid Chowdhury**

Full Stack MERN & Next.js Developer

📧 [programmer.zunaid@gmail.com](mailto:programmer.zunaid@gmail.com)

---

## ⭐ If you like this project, don't forget to give it a star!







































## 📸 Screenshot
<div align="center">
  <img src="./book-verse.jpeg" width="100%" alt="Completed project image" />
</div>