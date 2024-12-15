import { ValidationError, ValidationErrorItem } from "joi";
import User from "../../entity/User";
import { IUserInput, IUserOutput} from "../../interfaces/IUser";
import { AppDataSource } from "../../database/data-source";
import ErrorExtension from "../utils/ErrorExtension";
import userSchemaValiodation from "../utils/validations/userSchenaValidation";
import bcrypt from "bcrypt";
import { ILogin } from "../../interfaces/ILogin";
import Auth from "../utils/auth";

export default class UserRepository {
    //atributo privado para acessar o repositório de usuários
    private static usersRepository = AppDataSource.getRepository<User>(User);

    //metodos
    static async getUsers(): Promise<IUserOutput[]> {
        const users = await this.usersRepository.find();

        //removendo senha do retorno
        const usersReturned = users.map((user) => {
            const { password, ...userReturned } = user;
            return userReturned;
        });

        return usersReturned;
    }

    static async newUser(user: IUserInput): Promise<IUserOutput> {
        //validando dados do usuário
        const { error } = userSchemaValiodation.validate(user, { abortEarly: false });

        if(error) {
            const validationErrors = error.details.map(( detail: ValidationErrorItem) => detail.message);

            throw new ErrorExtension(400, validationErrors.join(", \n"));
        }

        //Criptografando dados do usuário
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;

        //salvando usuário no banco de dados
        const createdUser =  await this.usersRepository.save(user);

        //removendo senha do retorno
        const { password, ...userReturned } = createdUser;

        return userReturned as IUserOutput;
    }

    static async getUserById(id: number): Promise<IUserOutput | null> {
        const user = await this.usersRepository.findOneBy({ id });

        if (!user) {
            throw new ErrorExtension(404, "Usuário não encontrado");
        }

        //removendo senha do retorno
        const { password, ...userReturned } = user;

        return userReturned;
    }

    static async updateUser(id: number, user: IUserInput): Promise<string> {

        const userExists = await this.usersRepository.findOneBy({ id });

        if (!userExists) {
            throw new ErrorExtension(404, "Usuário não encontrado");
        }

        //verificando se senha existe
        if(user.password) {
            //Criptografando dados do usuário
            const hashedPassword = await bcrypt.hash(user.password, 10);
            user.password = hashedPassword;
        }

        const userUpdated =  await this.usersRepository.update(id, user);
               
        if (!userUpdated) {
            throw new ErrorExtension(500, "Erro ao atualizar usuário");
        }
        
        return "Usuário atualizado com sucesso!!!";
    }

    static async deleteUser(id: number): Promise<string> {
        const userExists = await this.usersRepository.findOneBy({ id });

        if (!userExists) {
            throw new ErrorExtension(404, "Usuário não encontrado");
        }

        const userDeleted = await this.usersRepository.delete(id);

        if (!userDeleted) {
            throw new ErrorExtension(500, "Erro ao deletar usuário");
        }

        return "Usuário deletado com sucesso!!!";
    }

    static async getUserByEmail(email: string): Promise<IUserOutput | null> {
        const user = await this.usersRepository.findOneBy({ email });

        if (!user) {
            throw new ErrorExtension(404, "Email não encontrado");
        }

        //removendo senha do retorno
        const { password, ...userReturned } = user;

        return userReturned;
    }

    static async auth(loginData: ILogin): Promise<string> {
       const { email, password } = loginData;

       //verificando se email e password existem
        if (!email || !password) {
            throw new ErrorExtension(400, "Email e senha são obrigatórios");
        }

        //buscando usuário pelo email
        const user = await this.usersRepository.findOneBy({ email });

        if (!user) {
            throw new ErrorExtension(404, "Usuário não encontrado");
        }

        //verificando se senha está correta
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            throw new ErrorExtension(401, "Enail ou Senha incorretos!!!");
        }

        const payload = {
            id: user.id,
            nome: user.name,
            email: user.email
        }

        //gerando token
        const token = new Auth().JwtGenerator(payload);

        return token;
    }
}
