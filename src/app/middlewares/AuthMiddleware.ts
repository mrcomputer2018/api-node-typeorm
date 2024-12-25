import ErrorExtension from "../utils/ErrorExtension";
import { Request, Response, NextFunction } from "express";
import Auth from "../utils/Auth";


export const AuthenticateMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization as string;

    if (!token) {
        throw new ErrorExtension(401, 'Unauthorized');
    }

    const auth = new Auth();

    //verificando se token esta valido
    auth.AuthenticatedToken(token);

    next();
}