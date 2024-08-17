# Second Test Assignment

[Live Demo link](https://ellty.senseoutdoors.store)

## Description

Number Communication Tree is a web application where users communicate by creating chains of mathematical operations starting from an initial number. The application features a server-side and client-side implementation, with operations like addition, subtraction, multiplication, and division forming a tree-like structure of calculations. Unregistered users can view the calculation tree, while registered users can start new calculations or respond to existing ones.

## Features

- Unregistered User:
  - View the tree of all calculations.
  - Register for an account.
  - Log in to become a registered user.
- Registered User:
  - Start a chain of calculations by publishing a starting number.
  - Add an operation to an existing calculation.
  - Respond to any other calculations with new operations.

## Technologies Used

- Backend: Node.js, TypeScript
- Frontend: React, TypeScript, Vite
- Containerization: Docker, Docker Compose

## Prerequisites

Before you start, make sure you have the following installed:

- Docker (https://docs.docker.com/get-docker/)
- Docker Compose (https://docs.docker.com/compose/install/)

## Installation and Running the Application

1. Clone the Repository

```bash
git clone https://github.com/s0d-d/second-test-assignment
cd second-test-assignment
```

2. Build and Run the Application Using Docker Compose

```bash
sudo docker-compose build --no-cache
sudo docker-compose up
```

This will start both the backend and frontend services. The application will be accessible at http://localhost:3000.

3. Run the Application from Source (Optional)
   If you prefer to run the application from source without Docker, follow these steps:

Running the Frontend

```bash
cd front-end
yarn install
yarn dev
```

This will start the frontend development server on http://localhost:5173.

Running the Backend
In a separate terminal window:

```bash
cd back-end

# The backend of this application requires a .env file for environment variables. So, create a .env file
sudo touch .env
```

Here's an example configuration:
```yaml
PORT=5000
DB_URI=mongodb://localhost:27017/second-test-assignment
JWT_SECRET=some_secret_key
```

Now, you can install and run
```bash
yarn install
yarn dev
```

This will start the backend server on http://localhost:5000.

## Project Structure

```bash
$ tree -L 1
.
├── README.md
├── docker-compose.yml: Docker Compose configuration file to build and run the application.
├── front-end: Contains the React-based frontend application.
└── back-end: Contains the Node.js backend application.
```

## Usage

- Viewing the Calculation Tree:
- Open the application in your browser at https://ellty.senseoutdoors.store.
- You can view the calculation tree as an unregistered user.
- Starting a New Calculation:
- Register and log in to start a new calculation.
- Select an operation and input a number to extend the calculation tree.
- Responding to Calculations:
- After logging in, click on any existing calculation in the tree to add a new operation.

## To-do:

- [x] docker
- [x] deploy
- [ ] helmet
- [ ] logging
- [ ] loading
- [ ] toasts
