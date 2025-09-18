"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
const seedData_1 = require("./seedData");
class DatabaseService {
    constructor() {
        this.users = [...seedData_1.sampleUsers];
        this.products = [...seedData_1.sampleProducts];
        this.orders = [...seedData_1.sampleOrders];
        this.carts = [...seedData_1.sampleCarts];
    }
    static getInstance() {
        if (!DatabaseService.instance) {
            DatabaseService.instance = new DatabaseService();
        }
        return DatabaseService.instance;
    }
    findUserById(id) {
        return this.users.find(user => user.id === id);
    }
    findUserByEmail(email) {
        return this.users.find(user => user.email === email);
    }
    createUser(user) {
        const newUser = {
            id: `user_${Date.now()}`,
            ...user,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        this.users.push(newUser);
        return newUser;
    }
    updateUser(id, updates) {
        const index = this.users.findIndex(user => user.id === id);
        if (index === -1)
            return null;
        this.users[index] = {
            ...this.users[index],
            ...updates,
            updatedAt: new Date()
        };
        return this.users[index];
    }
    deleteUser(id) {
        const index = this.users.findIndex(user => user.id === id);
        if (index === -1)
            return false;
        this.users.splice(index, 1);
        return true;
    }
    findProductById(id) {
        return this.products.find(product => product.id === id);
    }
    findProducts(filter = {}) {
        return this.products.filter(product => {
            let match = true;
            if (filter.category) {
                match = match && product.category === filter.category;
            }
            if (filter.brand) {
                match = match && product.brand === filter.brand;
            }
            if (filter.inStock !== undefined) {
                match = match && product.inStock === filter.inStock;
            }
            if (filter.minPrice !== undefined) {
                match = match && product.price >= filter.minPrice;
            }
            if (filter.maxPrice !== undefined) {
                match = match && product.price <= filter.maxPrice;
            }
            return match;
        });
    }
    createProduct(product) {
        const newProduct = {
            id: `product_${Date.now()}`,
            ...product,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        this.products.push(newProduct);
        return newProduct;
    }
    updateProduct(id, updates) {
        const index = this.products.findIndex(product => product.id === id);
        if (index === -1)
            return null;
        this.products[index] = {
            ...this.products[index],
            ...updates,
            updatedAt: new Date()
        };
        return this.products[index];
    }
    deleteProduct(id) {
        const index = this.products.findIndex(product => product.id === id);
        if (index === -1)
            return false;
        this.products.splice(index, 1);
        return true;
    }
    findOrderById(id) {
        return this.orders.find(order => order.id === id);
    }
    findOrdersByUserId(userId) {
        return this.orders.filter(order => order.userId === userId);
    }
    createOrder(order) {
        const newOrder = {
            id: `order_${Date.now()}`,
            ...order,
            orderDate: new Date(),
            createdAt: new Date(),
            updatedAt: new Date()
        };
        this.orders.push(newOrder);
        return newOrder;
    }
    updateOrder(id, updates) {
        const index = this.orders.findIndex(order => order.id === id);
        if (index === -1)
            return null;
        this.orders[index] = {
            ...this.orders[index],
            ...updates,
            updatedAt: new Date()
        };
        return this.orders[index];
    }
    deleteOrder(id) {
        const index = this.orders.findIndex(order => order.id === id);
        if (index === -1)
            return false;
        this.orders.splice(index, 1);
        return true;
    }
    findCartById(id) {
        return this.carts.find(cart => cart.id === id);
    }
    findCartByUserId(userId) {
        return this.carts.find(cart => cart.userId === userId);
    }
    createCart(cart) {
        const newCart = {
            id: `cart_${Date.now()}`,
            ...cart,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        this.carts.push(newCart);
        return newCart;
    }
    updateCart(id, updates) {
        const index = this.carts.findIndex(cart => cart.id === id);
        if (index === -1)
            return null;
        this.carts[index] = {
            ...this.carts[index],
            ...updates,
            updatedAt: new Date()
        };
        return this.carts[index];
    }
    deleteCart(id) {
        const index = this.carts.findIndex(cart => cart.id === id);
        if (index === -1)
            return false;
        this.carts.splice(index, 1);
        return true;
    }
}
exports.DatabaseService = DatabaseService;
//# sourceMappingURL=database.js.map