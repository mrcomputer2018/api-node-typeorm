// Quando faz autenticacao, o usuario passa email e senha
export interface ILogin {
    email: string;
    password: string;
}

// dados que o token tera dentro do payload
export interface ITokenData {
    nome: string;
    email: string;
}