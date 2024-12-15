import { AuthenticateMiddleware } from './../middlewares/AuthMiddleware';
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
        this.router.get("/:id", AuthenticateMiddleware, this.getUserById);
        this.router.put("/:id", this.updateUser);
        this.router.delete("/:id", this.deleteUser);
        this.router.post("/auth", this.authenticationUser);
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

    private async updateUser(req: Request, res: Response) {
        const { id } = req.params;
        const userUpdated = await UserRepository.updateUser(Number(id), req.body);

        res.status(200).json({ message: userUpdated });
    }

    private async deleteUser(req: Request, res: Response) {
        const { id } = req.params;
        const userDeleted = await UserRepository.deleteUser(Number(id));

        res.status(200).json({ message: userDeleted });
    }

    private async authenticationUser(req: Request, res: Response) {
        const token = await UserRepository.auth(req.body);

        res.status(200).json({ token });
    }
}

const userRouter = new UserController().router;

export default userRouter;