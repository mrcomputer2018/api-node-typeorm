import { sign, SignOptions, verify } from "jsonwebtoken";
import dotenv from "dotenv";
import { ITokenData } from "../../interfaces/ILogin";
import ErrorExtension from "./ErrorExtension"; // em caso de erro

dotenv.config();

const jwtDefaultConfig: SignOptions = {
    expiresIn: "1h",
    algorithm: "HS256",
}

const JWT_SECRET = process.env.SECRET as string;

export default class Auth {
    constructor(private jwtConfig?: SignOptions) {
        if (!this.jwtConfig) {
            this.jwtConfig = jwtDefaultConfig;
        }
    }

    // metodo para gerar token
    JwtGenerator(payload: ITokenData): string {
        const token = sign(payload, JWT_SECRET, this.jwtConfig);

        return token;
    }

    AuthenticatedToken(token: string) {
        if (!token) {
            throw new ErrorExtension(401, "Token não informado"); // erro 401, não autorizado
        }

        // garantindo que o token e valido
        try {
            const validateJwt = verify(token, process.env.JWT_SECRET, this.jwtConfig);

            return validateJwt as ITokenData; // retorna payload com dados do usuario

        } catch (error) {
            throw new ErrorExtension(401, "Token inválido"); // erro 401, não autorizado
        }
    }
}