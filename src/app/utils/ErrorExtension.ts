export default class ErrorExtension  extends Error {
    status: number;

    constructor( status: number, message: string ) {
        super(message);
        this.status = status;
    }
}