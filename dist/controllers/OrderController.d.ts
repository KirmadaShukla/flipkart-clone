import { Request, Response, NextFunction } from 'express';
import { BaseController } from './BaseController';
export declare class OrderController extends BaseController {
    getAll(req: Request, res: Response, next: NextFunction): Promise<Response>;
    getById(req: Request, res: Response, next: NextFunction): Promise<Response>;
    create(req: Request, res: Response, next: NextFunction): Promise<Response>;
    update(req: Request, res: Response, next: NextFunction): Promise<Response>;
    delete(req: Request, res: Response, next: NextFunction): Promise<Response>;
    getOrdersByUser(req: Request, res: Response, next: NextFunction): Promise<Response>;
    updateOrderStatus(req: Request, res: Response, next: NextFunction): Promise<Response>;
}
