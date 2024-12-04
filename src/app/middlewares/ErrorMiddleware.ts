import { Request, Response, NextFunction } from "express";
import ErrorExtension from "../utils/ErrorExtension";

const httpErrorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
    const { status, message } = error as ErrorExtension;
    res.status(status || 500).json({
        status: status || 500,
        message: error.message || 'Something went wrong'
    });
}

export default httpErrorMiddleware;