import { Request, Response, NextFunction } from 'express';

export abstract class BaseController {
  protected sendSuccess(res: Response, data: any, message: string = 'Success', statusCode: number = 200): Response {
    return res.status(statusCode).json({
      success: true,
      message,
      data
    });
  }

  protected sendError(res: Response, message: string = 'Internal Server Error', statusCode: number = 500, error: any = null): Response {
    return res.status(statusCode).json({
      success: false,
      message,
      error
    });
  }

  protected abstract getAll(req: Request, res: Response, next: NextFunction): Promise<Response>;
  protected abstract getById(req: Request, res: Response, next: NextFunction): Promise<Response>;
  protected abstract create(req: Request, res: Response, next: NextFunction): Promise<Response>;
  protected abstract update(req: Request, res: Response, next: NextFunction): Promise<Response>;
  protected abstract delete(req: Request, res: Response, next: NextFunction): Promise<Response>;
}