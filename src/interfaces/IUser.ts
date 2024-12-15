interface IUserInput {
    name: string
    email: string
    password: string
    birth_date: Date
    active?: boolean
}

interface IUserOutput{
    id: number
    name: string
    email: string
    password?: string
    birth_date: Date
    active?: boolean
}

export { IUserInput, IUserOutput }