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
        this.router.get("/:id", this.getUserById);
    }

    private async getAllUsers(req: Request, res: Response) {
        const users = await UserRepository.getUsers();

        res.status(200).json(users);
    }

    private async createdUser(req: Request, res: Response) {
        const userCreated = await UserRepository.newUser(req.body);

        res.status(201).json(userCreated);
    }

    private async getUserById(req: Request, res: Response) {
        const { id } = req.params;
        const user = await UserRepository.getUserById(Number(id));

        res.status(200).json(user);
    }
}

const userRouter = new UserController().router;

export default userRouter;