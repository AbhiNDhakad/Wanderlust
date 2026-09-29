# 🌍 Wanderlust

> A feature-rich web application built to explore, share, and review amazing travel destinations across the globe. Think of it as a cozy, community-driven platform for discovering your next getaway!

---

## 🚀 About the Project

**Wanderlust** is a full-stack web application designed for travel enthusiasts. Whether you want to list your own property/spot or browse through unique stays and hidden gems added by other users, Wanderlust makes it seamless and interactive. 

This project was built as a hands-on exploration of the Node.js ecosystem, putting emphasis on secure authentication, database modeling, and clean MVC architecture.

---

## ✨ Features

- **Explore Destinations:** Browse through a variety of stunning listings complete with pricing, locations, and descriptions.
- **User Authentication & Authorization:** Secure sign-up and log-in functionality (powered by Passport.js) ensuring users can only manage their own listings and reviews.
- **Create & Manage Listings:** Registered users can add new listings, update details, or delete places they've shared.
- **Interactive Reviews:** Leave ratings and comments on listings to share your experiences with the community.
- **Flash Messages & Error Handling:** Smooth user feedback system for successful actions, warnings, and errors.

---

## 🛠️ Tech Stack

**Frontend:**
- EJS (Embedded JavaScript Templates)
- HTML5, CSS3, Bootstrap

**Backend:**
- Node.js
- Express.js

**Database:**
- MongoDB & Mongoose (ODM)

**Authentication & Security:**
- Passport.js (Local Strategy)
- Express Sessions & Connect-Flash

---

## 📁 Project Structure

```text
Wanderlust/
├── controllers/      # Route logic and handlers
├── models/           # Mongoose schemas (Listing, User, Review)
├── public/           # Static assets (CSS, JS, images)
├── routes/           # Express routers (listings, reviews, user auth)
├── views/            # EJS templates and layouts
├── app.js            # Main application entry point
└── package.json      # Dependencies and scripts
