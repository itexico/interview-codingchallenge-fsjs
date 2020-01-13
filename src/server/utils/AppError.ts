export class AppError extends Error {
    public code: number;

    public message: string;

    public kind: string;

    public name: string;

    public constructor (message: string, code: number, kind = "", name = "") {
        super(message);

        this.message = message;
        this.code = code;
        this.kind = kind;
        this.name = name;
    }
}
