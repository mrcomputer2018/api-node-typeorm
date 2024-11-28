
import "reflect-metadata";
import "express-async-errors" ;
import dotenv from 'dotenv'
import express from "express"; //  "esModuleInterop": true, no tsconfig.json
import cors from "cors"; 
import {AppDataSource} from "./database/data-source"; // arquivo de conexão com o BD
//inicio da aplicação
const app = express();

//iniciar dotenv
dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(cors());

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