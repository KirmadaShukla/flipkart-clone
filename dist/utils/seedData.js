"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sampleCarts = exports.sampleOrders = exports.sampleProducts = exports.sampleUsers = void 0;
exports.sampleUsers = [
    {
        id: 'user_1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'Password123',
        phoneNumber: '9876543210',
        role: 'customer',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 'user_2',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        password: 'Password123',
        phoneNumber: '9876543211',
        role: 'admin',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
    }
];
exports.sampleProducts = [
    {
        id: 'product_1',
        name: 'iPhone 13 Pro',
        description: 'Latest iPhone with A15 Bionic chip, 120Hz display, and advanced camera system',
        price: 119900,
        discountPrice: 109900,
        category: 'Electronics',
        subCategory: 'Mobile Phones',
        brand: 'Apple',
        images: [
            'https://example.com/iphone13pro-1.jpg',
            'https://example.com/iphone13pro-2.jpg'
        ],
        inStock: true,
        quantity: 50,
        ratings: 4.5,
        specifications: {
            'Display': '6.1 inch Super Retina XDR',
            'Processor': 'A15 Bionic',
            'Camera': 'Triple 12MP system',
            'Battery': 'Up to 22 hours video playback'
        },
        tags: ['smartphone', 'apple', 'mobile', 'electronics'],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 'product_2',
        name: 'Samsung Galaxy S21',
        description: 'Powerful Android smartphone with excellent camera capabilities',
        price: 79999,
        category: 'Electronics',
        subCategory: 'Mobile Phones',
        brand: 'Samsung',
        images: [
            'https://example.com/galaxys21-1.jpg',
            'https://example.com/galaxys21-2.jpg'
        ],
        inStock: true,
        quantity: 30,
        ratings: 4.3,
        specifications: {
            'Display': '6.2 inch Dynamic AMOLED',
            'Processor': 'Exynos 2100',
            'Camera': 'Triple 12MP system',
            'Battery': '4000mAh'
        },
        tags: ['smartphone', 'samsung', 'mobile', 'electronics'],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 'product_3',
        name: 'MacBook Pro 14"',
        description: 'Apple M1 Pro chip, 14-inch Liquid Retina XDR display, 16GB RAM, 512GB SSD',
        price: 199900,
        discountPrice: 189900,
        category: 'Electronics',
        subCategory: 'Laptops',
        brand: 'Apple',
        images: [
            'https://example.com/macbookpro14-1.jpg',
            'https://example.com/macbookpro14-2.jpg'
        ],
        inStock: true,
        quantity: 20,
        ratings: 4.8,
        specifications: {
            'Display': '14.2 inch Liquid Retina XDR',
            'Processor': 'Apple M1 Pro',
            'Memory': '16GB unified memory',
            'Storage': '512GB SSD'
        },
        tags: ['laptop', 'apple', 'macbook', 'electronics'],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
    }
];
exports.sampleOrders = [
    {
        id: 'order_1',
        userId: 'user_1',
        items: [
            {
                productId: 'product_1',
                productName: 'iPhone 13 Pro',
                productImage: 'https://example.com/iphone13pro-1.jpg',
                quantity: 1,
                price: 109900,
                totalPrice: 109900
            }
        ],
        totalAmount: 109900,
        status: 'delivered',
        shippingAddress: {
            fullName: 'John Doe',
            addressLine1: '123 Main Street',
            city: 'Mumbai',
            state: 'Maharashtra',
            postalCode: '400001',
            country: 'India',
            phoneNumber: '9876543210'
        },
        paymentInfo: {
            method: 'credit_card',
            transactionId: 'txn_123456789',
            paidAt: new Date()
        },
        orderDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
    }
];
exports.sampleCarts = [
    {
        id: 'cart_1',
        userId: 'user_1',
        items: [
            {
                productId: 'product_2',
                productName: 'Samsung Galaxy S21',
                productImage: 'https://example.com/galaxys21-1.jpg',
                quantity: 1,
                price: 79999
            }
        ],
        totalItems: 1,
        totalAmount: 79999,
        createdAt: new Date(),
        updatedAt: new Date()
    }
];
//# sourceMappingURL=seedData.js.map