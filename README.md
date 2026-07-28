# 🏠 StayHub - Airbnb Clone

StayHub is a full-stack web application inspired by Airbnb where users can browse, search, create, edit, and review property listings. The application provides secure authentication, image uploads, and an intuitive responsive interface.

---

## 🚀 Features

- 🔐 User Authentication (Sign Up, Login, Logout)
- 🏠 Create, Edit, and Delete Listings
- 📷 Image Upload using Cloudinary
- ⭐ Add and Delete Reviews
- 🔍 Search Listings
- 📂 Category Filters
- 📱 Responsive Design
- 💬 Flash Messages
- 🔒 Session Management
- 👤 User Authorization
- ☁️ MongoDB Atlas Database

---

## 🛠 Tech Stack

### Frontend
- HTML5
- CSS3
- Bootstrap 5
- JavaScript
- EJS

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas
- Mongoose

### Authentication
- Passport.js
- Passport Local
- Express Session

### Cloud Storage
- Cloudinary
- Multer

---

## 📁 Project Structure

```
StayHub
│
├── controllers/
├── middleware/
├── models/
├── public/
│   ├── css/
│   ├── js/
│   └── images/
│
├── routes/
├── utils/
├── views/
│
├── app.js
├── package.json
├── .env
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/NikitaChaudhary317/StayHub.git
```

### Move into Project

```bash
cd StayHub
```

### Install Dependencies

```bash
npm install
```

### Create a `.env` File

```env
ATLASDB_URL=Your_MongoDB_Atlas_URL
SESSION_SECRET=Your_Secret_Key

CLOUD_NAME=Your_Cloudinary_Name
CLOUD_API_KEY=Your_API_Key
CLOUD_API_SECRET=Your_API_Secret
```

### Run the Project

```bash
npm start
```

or

```bash
npm run dev
```

---

## 📦 Packages Used

- express
- mongoose
- ejs
- ejs-mate
- express-session
- passport
- passport-local
- passport-local-mongoose
- connect-flash
- connect-mongo
- multer
- cloudinary
- multer-storage-cloudinary
- joi
- method-override
- dotenv

---

## 👨‍💻 Author

**Nikita Chaudhary**

GitHub: https://github.com/NikitaChaudhary317

LinkedIn: https://www.linkedin.com/in/nikita-chaudhary-0bbb2b343/

---

## 📄 License

This project is developed for learning purposes.
