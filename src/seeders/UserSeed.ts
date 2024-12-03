import { IUserInput } from "../interfaces/IUser";

const userSeed: IUserInput = {
    name: "admin",
    email: "admin@admin.com",
    password: "12345678",
    birth_date: new Date("1999-01-01"),
    active: true,
}

export default userSeed;