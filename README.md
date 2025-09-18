# Flipkart Clone - E-commerce Platform

A Node.js/TypeScript e-commerce backend application that replicates core functionality of Flipkart.

## Features

- User authentication (registration, login) with JWT tokens in cookies
- Password hashing with bcrypt
- Product management (CRUD operations) - Admin only
- Shopping cart functionality - Users and Admin
- Order processing - Users can create, Admin can manage
- Role-based access control (Admin/User)
- RESTful API design
- TypeScript support
- MongoDB with Mongoose ODM
- Async error handling
- Security headers with Helmet
- CORS support
- Request logging with Morgan
- Cookie-based authentication

## Tech Stack

- **Node.js** - JavaScript runtime environment
- **TypeScript** - Typed superset of JavaScript
- **Express.js** - Web framework for Node.js
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling tool
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **cookie-parser** - Cookie parsing middleware
- **dotenv** - Environment variable management
- **helmet** - Security headers
- **cors** - Cross-Origin Resource Sharing
- **morgan** - HTTP request logger

## Prerequisites

- Node.js v14 or higher
- MongoDB database (local or cloud)
- npm or yarn package manager

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd flipkart-clone
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your environment variables:
   ```env
   NODE_ENV=development
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/flipkart_clone
   COOKIE_EXPIRE=7
   JWT_SECRET=your_jwt_secret_key
   ```

4. Start MongoDB locally or use a cloud MongoDB service like MongoDB Atlas.

## Usage

1. Build the TypeScript code:
   ```bash
   npm run build
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Or start the production server:
   ```bash
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user

### Users
- `GET /api/users/:id` - Get user by ID (authenticated user)
- `GET /api/users` - Get all users (admin only)
- `POST /api/users` - Create a new user (admin only)
- `PUT /api/users/:id` - Update user (admin only)
- `DELETE /api/users/:id` - Delete user (admin only)

### Products
- `GET /api/products` - Get all products (public)
- `GET /api/products/:id` - Get product by ID (public)
- `POST /api/products` - Create a new product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)
- `GET /api/products/categories` - Get all product categories (public)
- `GET /api/products/brands` - Get all product brands (public)

### Orders
- `GET /api/orders` - Get all orders (admin only)
- `GET /api/orders/:id` - Get order by ID (authenticated user)
- `POST /api/orders` - Create a new order (authenticated user)
- `PUT /api/orders/:id` - Update order (admin only)
- `DELETE /api/orders/:id` - Delete order (admin only)
- `GET /api/orders/user/:userId` - Get orders by user ID (authenticated user)
- `PUT /api/orders/:id/status` - Update order status (admin only)

### Cart
- `GET /api/carts` - Get all carts (admin only)
- `GET /api/carts/:id` - Get cart by ID (admin only)
- `POST /api/carts` - Create a new cart (admin only)
- `PUT /api/carts/:id` - Update cart (admin only)
- `DELETE /api/carts/:id` - Delete cart (admin only)
- `GET /api/carts/user/:userId` - Get cart by user ID (authenticated user)
- `POST /api/carts/user/:userId/items` - Add item to cart (authenticated user)
- `DELETE /api/carts/user/:userId/items/:productId` - Remove item from cart (authenticated user)
- `DELETE /api/carts/user/:userId/clear` - Clear cart (authenticated user)

## Authentication

Most API endpoints require authentication. Authentication is handled through JWT tokens which are sent in cookies.

1. Register or login to get a token (automatically set in cookies)
2. All subsequent requests will automatically use the token from cookies

You can also send the token in the Authorization header:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

## Role-Based Access Control

The application implements role-based access control with two roles:
- **User**: Can view products, manage their own cart, create orders, and view their own orders
- **Admin**: Can perform all actions including managing products, orders, and users

To become an admin, a user's role must be set to 'admin' in the database.

## Project Structure

```
src/
├── config/              # Configuration files
├── controllers/         # Request handlers
├── middlewares/         # Custom middleware
├── models/              # Data models
│   └── mongoose/        # Mongoose models
├── routes/              # API routes
├── utils/               # Utility functions
├── index.ts             # Application entry point
└── server.ts            # Server configuration
```

## Development

1. Run in development mode with auto-reload:
   ```bash
   npm run dev
   ```

2. Build the project:
   ```bash
   npm run build
   ```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by Flipkart's e-commerce platform
- Built with modern web technologies