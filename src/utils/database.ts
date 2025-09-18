import { User } from '../models/User';
import { Product } from '../models/Product';
import { Order } from '../models/Order';
import { Cart } from '../models/Cart';
import { sampleUsers, sampleProducts, sampleOrders, sampleCarts } from './seedData';

export class DatabaseService {
  private static instance: DatabaseService;
  
  // In-memory storage
  public users: User[] = [...sampleUsers];
  public products: Product[] = [...sampleProducts];
  public orders: Order[] = [...sampleOrders];
  public carts: Cart[] = [...sampleCarts];
  
  private constructor() {}
  
  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }
  
  // User methods
  public findUserById(id: string): User | undefined {
    return this.users.find(user => user.id === id);
  }
  
  public findUserByEmail(email: string): User | undefined {
    return this.users.find(user => user.email === email);
  }
  
  public createUser(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): User {
    const newUser: User = {
      id: `user_${Date.now()}`,
      ...user,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.users.push(newUser);
    return newUser;
  }
  
  public updateUser(id: string, updates: Partial<User>): User | null {
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) return null;
    
    this.users[index] = {
      ...this.users[index],
      ...updates,
      updatedAt: new Date()
    };
    
    return this.users[index];
  }
  
  public deleteUser(id: string): boolean {
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) return false;
    
    this.users.splice(index, 1);
    return true;
  }
  
  // Product methods
  public findProductById(id: string): Product | undefined {
    return this.products.find(product => product.id === id);
  }
  
  public findProducts(filter: any = {}): Product[] {
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
  
  public createProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Product {
    const newProduct: Product = {
      id: `product_${Date.now()}`,
      ...product,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.products.push(newProduct);
    return newProduct;
  }
  
  public updateProduct(id: string, updates: Partial<Product>): Product | null {
    const index = this.products.findIndex(product => product.id === id);
    if (index === -1) return null;
    
    this.products[index] = {
      ...this.products[index],
      ...updates,
      updatedAt: new Date()
    };
    
    return this.products[index];
  }
  
  public deleteProduct(id: string): boolean {
    const index = this.products.findIndex(product => product.id === id);
    if (index === -1) return false;
    
    this.products.splice(index, 1);
    return true;
  }
  
  // Order methods
  public findOrderById(id: string): Order | undefined {
    return this.orders.find(order => order.id === id);
  }
  
  public findOrdersByUserId(userId: string): Order[] {
    return this.orders.filter(order => order.userId === userId);
  }
  
  public createOrder(order: Omit<Order, 'id' | 'createdAt' | 'updatedAt' | 'orderDate'>): Order {
    const newOrder: Order = {
      id: `order_${Date.now()}`,
      ...order,
      orderDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.orders.push(newOrder);
    return newOrder;
  }
  
  public updateOrder(id: string, updates: Partial<Order>): Order | null {
    const index = this.orders.findIndex(order => order.id === id);
    if (index === -1) return null;
    
    this.orders[index] = {
      ...this.orders[index],
      ...updates,
      updatedAt: new Date()
    };
    
    return this.orders[index];
  }
  
  public deleteOrder(id: string): boolean {
    const index = this.orders.findIndex(order => order.id === id);
    if (index === -1) return false;
    
    this.orders.splice(index, 1);
    return true;
  }
  
  // Cart methods
  public findCartById(id: string): Cart | undefined {
    return this.carts.find(cart => cart.id === id);
  }
  
  public findCartByUserId(userId: string): Cart | undefined {
    return this.carts.find(cart => cart.userId === userId);
  }
  
  public createCart(cart: Omit<Cart, 'id' | 'createdAt' | 'updatedAt'>): Cart {
    const newCart: Cart = {
      id: `cart_${Date.now()}`,
      ...cart,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.carts.push(newCart);
    return newCart;
  }
  
  public updateCart(id: string, updates: Partial<Cart>): Cart | null {
    const index = this.carts.findIndex(cart => cart.id === id);
    if (index === -1) return null;
    
    this.carts[index] = {
      ...this.carts[index],
      ...updates,
      updatedAt: new Date()
    };
    
    return this.carts[index];
  }
  
  public deleteCart(id: string): boolean {
    const index = this.carts.findIndex(cart => cart.id === id);
    if (index === -1) return false;
    
    this.carts.splice(index, 1);
    return true;
  }
}