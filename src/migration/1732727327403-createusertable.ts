import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Createusertable1732727327403 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "users",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true, // chave primaria
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "name",
                    type: "varchar",
                    length: "100", // tamanho do campo
                    isNullable: false // não pode ser nulo
                },
                {
                    name: "email",
                    type: "varchar",
                    length: "100",
                    isUnique: true // campo unico
                },
                {
                    name: "password",
                    type: "varchar",
                    length: "100",
                    isNullable: false
                },
                {
                    name: "birth_date",
                    type: "Date",
                    isNullable: false,
                },
                {
                    name: "active",
                    type: "boolean",
                    default: true // valor padrão
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    isNullable: false,
                    default: "now()" // valor padrão
                },
                {
                    name: "updated_at",
                    type: "timestamp",
                    isNullable: false,
                    default: "now()" // valor padrão
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }

}
