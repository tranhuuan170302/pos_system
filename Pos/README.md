# Point of Sale System (POS) Backend

## Overview

This is the backend for a Point of Sale (POS) system developed using Node.js. It provides RESTful APIs to manage sales, inventory, and customer data for a retail environment.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Features

- Manage products and inventory
- Process sales and generate receipts
- Track customer information and purchase history
- User authentication and authorization
- Generate sales reports

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/pos-backend.git
   cd pos-backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Copy the sample environment file:

   ```bash
   cp .env.example .env
   ```

   Update `.env` with your configuration values (e.g., database connection details, API keys).

4. **Run the application:**

   ```bash
   npm start
   ```

   The application will start on `http://localhost:3000` by default.

## Configuration

Configuration settings are stored in the `.env` file. Key settings include:

- `PORT`: Port number for the application (default: 3000)
- `DATABASE_URL`: URL for the database connection
- `JWT_SECRET`: Secret key for JSON Web Token (JWT) authentication

## Usage

### API Endpoints

- `GET /api/products` - List all products
- `POST /api/products` - Create a new product
- `GET /api/products/:id` - Get details of a product
- `PUT /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product

Refer to the [API Documentation](#api-documentation) for detailed information.

## API Documentation

The API documentation can be found in the `/docs` directory. You can also use tools like [Postman](https://www.postman.com/) or [Swagger](https://swagger.io/) for testing and exploring the API endpoints.

## Testing

To run the tests, use the following command:

```bash
npm test
```
