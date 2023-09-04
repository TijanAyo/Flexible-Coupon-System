# Flexible Coupon System API

## Overview

The Flexible Coupon System API is a Node.js backend implementation using Express.js and Sequelize ORM. 
It enables an e-commerce website to offer flexible coupon-based discounts with ease. The API allows for the creation of 
coupon codes with specific rules and discount types, ensuring that discounts are applied only when conditions are met.

## Installation

Follow these steps to set up the Flexible Coupon System API on your local machine:

1. Clone the repository to your local environment:

   ```bash
   git clone https://github.com/TijanAyo/Flexible-Coupon-System.git
   ```
2. Navigate to the project directory:
    
    ```bash
   cd flexible-coupon-api
   ```

3. Install the required dependencies using npm:
    ```bash
   npm install
   ```
4. Create a .env file in the project root directory and set your environment variables

5. Start development server:
    ```bash 
   npm run start:dev
    ```
The API should now be running locally at http://localhost:4070.

## Getting Started

### Endpoints

- **GET /cart**: Retrieve the default cart information owned by "admin." This endpoint provides information about items in the cart and the total price.

- **POST /coupon**: Apply a coupon code to the cart, check its validity, and receive the adjusted price and discount amount.

- **POST /cart/new**: Add items to the cart to test the coupon functionality.

### Available Coupon Codes

- `FIXED10`: Apply this coupon to get a $10 fixed discount on the total price when the cart's total price is greater than $50 and contains at least 1 item.

- `PERCENT10`: Apply this coupon to get a 10% discount on the total price when the cart's total price is greater than $100 and contains at least 2 items.

- `MIXED10`: Apply this coupon to get a 10% discount on the total price when the cart's total price is greater than $200 and contains at least 3 items.

- `REJECTED10`: Apply this coupon to get a $10 fixed discount and a 10% discount on the total price when the cart's total price is greater than $1000.

## Documentation

**API Documentation**: [Flexible Coupon System API Documentation](https://documenter.getpostman.com/view/19118409/2s9Y5eMzRD)

**Note:**
Due to the use of a free-tier server, the server may enter a sleep mode after 15 minutes of inactivity. As a result, your initial request may experience a slight delay. Subsequent requests will be processed promptly.
