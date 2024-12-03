import User from "../../entity/User";
import { IUserOutput } from "../../interfaces/IUser";
import { AppDataSource } from "../../database/data-source";

export default class UserRepository {
    private static usersRepository = AppDataSource.getRepository(User);

    static async getUsers(): Promise<IUserOutput[]> {
        return await this.usersRepository.find();
    }
}
