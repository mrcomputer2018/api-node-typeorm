interface IUserInput {
    id?: number
    name: string
    email: string
    password: string
    birth_date: Date
    active: boolean
}

interface IUserOutput extends IUserInput {
    id?: number
}

export { IUserInput, IUserOutput }