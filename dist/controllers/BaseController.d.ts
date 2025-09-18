import { Request, Response, NextFunction } from 'express';
export declare abstract class BaseController {
    protected sendSuccess(res: Response, data: any, message?: string, statusCode?: number): Response;
    protected sendError(res: Response, message?: string, statusCode?: number, error?: any): Response;
    protected abstract getAll(req: Request, res: Response, next: NextFunction): Promise<Response>;
    protected abstract getById(req: Request, res: Response, next: NextFunction): Promise<Response>;
    protected abstract create(req: Request, res: Response, next: NextFunction): Promise<Response>;
    protected abstract update(req: Request, res: Response, next: NextFunction): Promise<Response>;
    protected abstract delete(req: Request, res: Response, next: NextFunction): Promise<Response>;
}
