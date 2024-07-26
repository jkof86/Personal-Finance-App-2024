# Personal Finance App

## Introduction

The Personal Finance App is a web-based application designed to help users manage their personal finances efficiently. Users can create, update, and delete transactions for specific accounts, and the app automatically updates the account balance accordingly. The application also supports recurring transactions and provides a clear view of account details.

## Technologies Used

### Backend
- **Java 22**: The programming language used for developing the backend services.
- **Spring Boot 3.3.1**: Framework used for building the backend REST API.
- **Spring Data JPA**: For data persistence and ORM.
- **PostgreSQL**: The relational database management system used to store the data.

### Frontend
- **React 18.3.1**: JavaScript library for building user interfaces.
- **React Bootstrap 2.10.4**: For responsive UI components.
- **Axios 1.7.2**: For making HTTP requests to the backend API.
- **React Router DOM 6.24.1**: For routing within the React application.

## Prerequisites

Before running the application, ensure you have the following installed on your machine:

- **Java 22**: [Download Java](https://www.oracle.com/java/technologies/javase-jdk22-downloads.html)
- **Node.js and npm**: [Download Node.js](https://nodejs.org/)
- **PostgreSQL**: [Download PostgreSQL](https://www.postgresql.org/download/)

## How to Run the Application

### Backend

1. **Clone the Repository**

   ```bash
   git clone https://github.com/2406-Ryan-Java-FS/Group-1.git
   cd projec1-backend

   
2. **Configure Database**
   - Create a PostgreSQL database and update the application.properties file with   your database credentials.

   ```
   spring.datasource.url=jdbc:postgresql://localhost:5432/your-database
   spring.datasource.username=your-username
   spring.datasource.password=your-password
   spring.jpa.hibernate.ddl-auto=update
   ```

3. **Build and Run**

      ```
      mvn clean install
      mvn spring-boot:run

      ```

  ### Frontend

1. **Navigate to the Frontend Directory**
   ```
   cd project1-frontend
   ```

2. **Install Dependencies**
   ```
   npm install
   ```

3. **Run the Application**
   ```
   npm start
   ```
   -The frontend application should now be running on http://localhost:3000

## API Documentation

  - GET /transactions: Retrieve all transactions.
  - POST /transactions/{accountId}: Add a new transaction to an account.
  - PUT /transactions/{id}: Update an existing transaction.
  - DELETE /transactions/{id}: Delete a transaction.
  - GET /transactions/account/{accountId}: Retrieve transactions by account ID.
  - GET /transactions/user/{userId}: Retrieve transactions by user ID.
  - GET /transactions/date/{date}: Retrieve transactions by date.
  - GET /transactions/recurring: Retrieve recurring transactions.
  - GET /transactions/type/{transactionType}: Retrieve transactions by type.
  - POST /transactions/transfer: Transfer funds between accounts.\
    \
  <sup><sub>This is just some of the endpoints available.</sub></sup>
## Request and Response Format
 - All requests and responses are in JSON format.

## Development Tips

  1. Backend
      - Ensure your PostgreSQL server is running and accessible.
      - Keep the application.properties file updated with the correct database credentials.
      - Use the mvn spring-boot:run command to run the backend server in development mode.
        
   2. Frontend

      - Ensure the backend server is running before starting the frontend.
      - Use npm start to run the frontend application in development mode.


   



   
