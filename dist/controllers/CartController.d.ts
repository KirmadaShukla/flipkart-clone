import { Request, Response, NextFunction } from 'express';
import { BaseController } from './BaseController';
export declare class CartController extends BaseController {
    getAll(req: Request, res: Response, next: NextFunction): Promise<Response>;
    getById(req: Request, res: Response, next: NextFunction): Promise<Response>;
    create(req: Request, res: Response, next: NextFunction): Promise<Response>;
    update(req: Request, res: Response, next: NextFunction): Promise<Response>;
    delete(req: Request, res: Response, next: NextFunction): Promise<Response>;
    getCartByUser(req: Request, res: Response, next: NextFunction): Promise<Response>;
    addItemToCart(req: Request, res: Response, next: NextFunction): Promise<Response>;
    removeItemFromCart(req: Request, res: Response, next: NextFunction): Promise<Response>;
    clearCart(req: Request, res: Response, next: NextFunction): Promise<Response>;
    private calculateTotalAmount;
}
