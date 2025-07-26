# 🎓 AdmitEase  
A full-stack **College Booking Web App** where users can explore colleges, submit admission forms, view detailed information, and post reviews. Built using the **MERN Stack** (MongoDB, Express, React, Node.js) with secure authentication via Firebase and a fully responsive design.

---

## 🔗 Live Links

- **Frontend**: [https://admit-ease.vercel.app/](https://admit-ease.vercel.app/)
- **Backend**: [https://admitease-server.onrender.com](https://admitease-server.onrender.com)

---

## 📁 Project Structure

### 🚀 Frontend
```plaintext
Front-end/
├── public/
├── src/
│   ├── components/
│   │   ├── NavBar/
│   │   └── Footer/
│
│   ├── context/
│   │   └── AuthContext/
│
│   ├── data/
│   │   └── colleges/                # dummy data
│
│   ├── hooks/
│   │   └── useAuth.js
│
│   ├── Layouts/
│   │   └── MainLayout/
│
│   ├── pages/
│   │   ├── HomePage/
│   │   │   ├── HeroSection/
│   │   │   ├── FeaturedCollegeSection/      # dummy data
│   │   │   ├── GraduateGallerySection/      # dummy data
│   │   │   ├── ResearchPaperSection/        # dummy data
│   │   │   └── StudentReviewsSection/       # integrated with backend
│   │   ├── AdmissionPage/                   # integrated with backend
│   │   │   ├── Admission/
│   │   │   └── AdmissionForm/
│   │   ├── CollegeDetails/                  # dummy data
│   │   ├── Colleges/                        # dummy data
│   │   ├── Login/                           # integrated with backend
│   │   ├── MyCollege/                       # integrated with backend
│   │   ├── NotFound/
│   │   ├── PasswordReset/
│   │   ├── Profile/                         # integrated with backend
│   │   └── Register/                        # integrated with backend
│
│   ├── routes/
│   │   ├── PrivateRoute.jsx
│   │   └── Router.jsx
│
├── firebase.js
└── main.jsx
```

---

### ⚙️ Backend

```plaintext
backend/
├── controllers/
│   ├── userController.js              # Handles user logic
│   ├── admissionController.js         # Admission form logic
│   └── reviewController.js            # Review CRUD operations
│
├── routes/
│   ├── userRoutes.js                  # User routes
│   ├── admissionRoutes.js             # Admission routes
│   └── reviewRoutes.js                # Review routes
│
├── middleware/
│   └── verifyToken.js                 # Firebase token verification
│
├── config/
│   ├── db.js                          # MongoDB connection
│   └── firebase-service-account.json  # Firebase Admin credentials
│
├── .env                               # Environment variables
├── .gitignore                         # Git ignore file
├── server.js                          # Server entry point
└── package.json                       # Backend dependencies
```

---

## ✨ Features

### 🏠 Home Page

* Navbar with: `Home`, `Colleges`, `Admission`, `My College`, `Log in`, `Register`
* Hero Section with college search by name
* College Cards: Image, Name, Admission Dates, Events, Research, Sports
* Sections:

  * 🎓 Graduation Gallery  
  * 📚 Research Paper Links  
  * 🌟 Dynamic Student Reviews

---

## 🧪 Key Routes

```plaintext
| Route               | Description                                                  |
|---------------------|--------------------------------------------------------------|
| `/`                 | Home page                                                    |
| `/colleges`         | All college listings                                         |
| `/college/:id`      | College details: Images, Admission, Events, Research, Sports |
| `/admission`        | Admission form for candidates                                |
| `/my-college`       | View admitted college, submit review                         |
| `/profile`          | View/edit user profile                                       |
| `/login`            | Login via Firebase                                           |
| `/register`         | Register via Firebase                                        |
| `/reset-password`   | Reset user password                                          |
| `*`                 | Custom 404 route                                             |
```

---

## 🔐 Authentication & Authorization

* **Firebase Auth**:
  * Email & Password
  * Google Login
  * Facebook Login

* **Protected Routes**:
  * Only authenticated users can:
    * View college details
    * Submit admission forms
    * Post reviews

* Password reset support

---

### 🧾 Admission

* Submit admission form with required info  
* View submitted form on `My College` page  
* Post reviews & ratings for admitted college  

---

### 🧑‍💼 User Profile

* Update: name, email, university, address

---

### ❗ 404 Page

* Styled custom “Not Found” page

---

### 📱 Responsive Design

* Mobile, tablet, and desktop support

---

## 🛠 Tech Stack

### Frontend

* React.js (Vite)  
* React Router DOM  
* Tailwind CSS  
* Firebase Auth  
* Axios  

### Backend

* Node.js  
* Express.js  
* MongoDB (Atlas)  
* Firebase Admin SDK  

---

## 🗃 MongoDB Collections

* `users`  
* `admissions`  
* `reviews`  

---

## 🧩 Installation & Setup

### 🔧 Backend Setup

```bash
cd backend
npm install
touch .env
```

Create a `.env` file and add:

```
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
FIREBASE_SERVICE_ACCOUNT=your_firebase_admin_json_stringified
```

Start the server:

```bash
node server.js
```

---

### 🔧 Frontend Setup

```bash
cd Front-end
npm install
npm run dev
```

---

### 👩‍💻 Developer

**Nahia Nowreen Urnisha**  
MERN Stack Developer | Tech Blogger

📫 [urnisha09@gmail.com](mailto:urnisha09@gmail.com)
