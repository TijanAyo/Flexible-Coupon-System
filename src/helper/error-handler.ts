export enum Httpcode {
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    VALIDATION_ERROR = 422,
    INTERNAL_SERVER_ERROR = 500
}

interface ErrorMsgArgs {
    name?: string;
    httpCode: Httpcode;
    description: string;
}

class NotFoundException extends Error {
    statusCode: number;

    constructor(args: ErrorMsgArgs) {
        super(args.description);
        this.name = "NotFoundError";
        this.statusCode = Httpcode.NOT_FOUND;
    }
}

class InternalServerException extends Error {
    statusCode: number;

    constructor(args: ErrorMsgArgs) {
        super(args.description);
        this.name = "Authentication Error";
        this.statusCode = Httpcode.INTERNAL_SERVER_ERROR;
    }
}

class BadRequestException extends Error {
    statusCode: number;

    constructor(args: ErrorMsgArgs) {
        super(args.description);
        this.name = "Authentication Error";
        this.statusCode = Httpcode.BAD_REQUEST;
    }
}

class ValidationException extends Error {
    statusCode: number;

    constructor(args: ErrorMsgArgs) {
        super(args.description);
        this.name = "Validation Error";
        this.statusCode = Httpcode.VALIDATION_ERROR;
    }
}

export {
    NotFoundException,
    InternalServerException,
    BadRequestException,
    ValidationException
};
