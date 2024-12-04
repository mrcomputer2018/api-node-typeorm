import { Request, Response, Router } from "express";
import UserRepository from "../repositories/UserRepository";

class UserController {
    public router: Router;

    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get("/", this.getAllUsers);
        this.router.post("/", this.createdUser);
    }

    private async getAllUsers(req: Request, res: Response) {
        const users = await UserRepository.getUsers();

        res.status(200).json(users);
    }

    private async createdUser(req: Request, res: Response) {
        const userCreated = await UserRepository.newUser(req.body);

        res.status(201).json(userCreated);
    }
}

const userRouter = new UserController().router;

export default userRouter;