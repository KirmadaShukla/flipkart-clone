import { Request, Response, NextFunction } from 'express';
import { BaseController } from './BaseController';
export declare class UserController extends BaseController {
    getAll(req: Request, res: Response, next: NextFunction): Promise<Response>;
    getById(req: Request, res: Response, next: NextFunction): Promise<Response>;
    create(req: Request, res: Response, next: NextFunction): Promise<Response>;
    update(req: Request, res: Response, next: NextFunction): Promise<Response>;
    delete(req: Request, res: Response, next: NextFunction): Promise<Response>;
    login(req: Request, res: Response, next: NextFunction): Promise<Response>;
    register(req: Request, res: Response, next: NextFunction): Promise<Response>;
}
