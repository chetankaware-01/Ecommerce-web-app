# E-commerce Application

This is a full-stack e-commerce application built using Spring Boot for the backend, React for the frontend, and MySQL as the database.

#UI
![Screenshot (392)](https://github.com/user-attachments/assets/fcf26b69-1380-4af0-89ff-895a04b608eb)
![Screenshot (391)](https://github.com/user-attachments/assets/f5887e57-e1a4-40b4-b79d-bd48834e23b3)
![Screenshot (398)](https://github.com/user-attachments/assets/7d9fe621-793e-46e9-8c96-6c72fe6f941f)




## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Usage](#usage)
- [Database Schema](#database-schema)
- [Contributing](#contributing)
- [License](#license)

## Features
- User authentication and authorization
- Product catalog with categories
- Shopping cart functionality
- Order management system
- Admin panel for managing products, users, and orders
- Responsive design for a seamless user experience across devices

## Tech Stack
- **Frontend**: React, HTML, CSS, JavaScript
- **Backend**: Spring Boot, Java
- **Database**: MySQL
- **Build Tools**: Maven, npm
- **Version Control**: Git

## Prerequisites
- Java 11 or higher
- React JS
- MySQL Server
- Maven

## Getting Started

### Backend
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/ecommerce-app.git
   cd ecommerce-app
Navigate to the backend directory:

cd backend
Build the project using Maven:


mvn clean install
Run the Spring Boot application:


mvn spring-boot:run
Frontend
Navigate to the frontend directory:


cd frontend
Install dependencies:


npm install
Start the React development server:

npm start
Configuration
Database
Ensure that MySQL is running and you have a database created for the application.
Update the database connection properties in application.properties or application.yml in the backend:
properties


spring.datasource.url=jdbc:mysql://localhost:3306/your-database-name
spring.datasource.username=your-username
spring.datasource.password=your-password

Application Properties
You can configure various application settings like server port, JWT secret, etc., in the application.properties file.
Usage
Access the application at http://localhost:3000 (default for React).
Admin can access the admin panel at http://localhost:3000/admin.
Database Schema
The MySQL database schema is automatically created by Spring Boot based on the JPA entities.
Ensure the correct configurations are set in application.properties for schema generation.
Contributing
Fork the repository.
Create a new branch (git checkout -b feature-branch).
Commit your changes (git commit -am 'Add new feature').
Push to the branch (git push origin feature-branch).
Create a new Pull Request.
