
import "reflect-metadata";
import "express-async-errors" ;
import dotenv from 'dotenv'
import express from "express"; //  "esModuleInterop": true, no tsconfig.json
import cors from "cors"; 
import {AppDataSource} from "./database/data-source"; // arquivo de conexão com o BD
import routers from './app/routes/index'// arquivo de rotas
import httpErrorMiddleware from "./app/middlewares/ErrorMiddleware"; // arquivo de tratamento de erros

//inicio da aplicação
const app = express();

//iniciar dotenv
dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(routers);

app.use(httpErrorMiddleware);

app.use(express.json());

AppDataSource.initialize()
.then( async () => {
    console.log("Conexão com o banco de dados realizada com sucesso!");

    app.listen(PORT, () => {
        console.log("Servidor rodando na porta 3000");
    });
})
.catch( (error) => {
    console.log("Erro ao conectar com o banco de dados: ", error);
});