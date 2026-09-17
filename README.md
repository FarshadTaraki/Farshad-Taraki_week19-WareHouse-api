# 📦 Warehouse Management System

A warehouse management application built with **React.js**, designed to manage products through an admin panel with authentication, form validation, API communication, and pagination.

## ✨ Features

### 🔐 Authentication

- User registration
- User login
- Authentication with API token
- Protected admin panel routes
- Logout functionality

### 👨‍💼 Admin Panel

- Dashboard for managing products
- Display product list
- Create new products
- Edit product information
- Delete products
- Search products
- Pagination

### 📝 Form Validation

Forms are handled and validated using:

- **React Hook Form**
- **Yup**
- Custom validation rules and error messages

### 🔄 API & Server State

API requests and server state management are handled using:

- **Axios**
- **TanStack Query**
- Query and mutation management
- Loading and error states
- Automatic refetching after mutations

### ⚛️ React Features

The project uses several important React concepts:

- `useState`
- Context API
- Custom hooks
- Component-based architecture
- State management
- Conditional rendering

### 🧭 Routing

Application navigation is handled using **React Router DOM**.

The application includes routes for:

- Login
- Register
- Admin Panel
- Product management

## 🛠️ Technologies

### Frontend

- React.js
- Vite
- React Router DOM
- Axios
- TanStack Query
- React Hook Form
- Yup
- Context API
- CSS

### Backend

- Node.js
- Express.js
- JWT Authentication
- REST API
- Swagger

## 📁 Project Structure

```text
warehouse-project/
│
├── warehouse-api/
│   ├── data/
│   ├── middleware/
│   ├── routes/
│   ├── swagger/
│   ├── server.js
│   ├── package.json
│   └── ...
│
├── warehouse-frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── schemas/
│   │   ├── assets/
│   │   ├── contexts/
│   │   ├── services/
│   │   └── ...
│   ├── public/
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md
```

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
```

### 2. Run the Backend

```bash
cd warehouse-api
npm install
npm start
```

### 3. Run the Frontend

Open another terminal:

```bash
cd warehouse-frontend
npm install
npm run dev
```

The frontend and backend run as separate applications and communicate through the REST API.

## 📌 Main Functionalities

| Feature               | Status |
| --------------------- | ------ |
| User Registration     | ✅     |
| User Login            | ✅     |
| Authentication        | ✅     |
| Admin Panel           | ✅     |
| Create Product        | ✅     |
| Edit Product          | ✅     |
| Delete Product        | ✅     |
| Product Search        | ✅     |
| Pagination            | ✅     |
| Form Validation       | ✅     |
| React Hook Form       | ✅     |
| Yup                   | ✅     |
| TanStack Query        | ✅     |
| Context API           | ✅     |
| React Router DOM      | ✅     |
| REST API              | ✅     |
| Swagger Documentation | ✅     |

## 👨‍💻 Author

**Farshad Taraki**

Frontend Developer
