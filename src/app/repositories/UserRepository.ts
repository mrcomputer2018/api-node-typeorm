import User from "../../entity/User";
import { IUserInput, IUserOutput} from "../../interfaces/IUser";
import { AppDataSource } from "../../database/data-source";
import ErrorExtension from "../utils/ErrorExtension";

export default class UserRepository {
    //atributo privado para acessar o repositório de usuários
    private static usersRepository = AppDataSource.getRepository<User>(User);

    //metodos
    static async getUsers(): Promise<IUserOutput[]> {
        return await this.usersRepository.find();
    }

    static async newUser(user: IUserInput): Promise<IUserOutput> {
        const createdUser =  await this.usersRepository.save(user);
        return createdUser;
    }

    static async getUserById(id: number): Promise<IUserOutput | null> {
        const user = await this.usersRepository.findOneBy({ id });

        if (!user) {
            throw new ErrorExtension(401, "Usuário não encontrado");
        }

        return user
    }
}
