import {
    BadRequestException,
    Httpcode,
    InternalServerException,
    NotFoundException,
    ValidationException
} from "../helper/error-handler";
import {Response} from "express";
import {logger} from "../helper/logger";

class CustomErrorHandler {
    async handleCustomError(err:any, res: Response) {
        if (err instanceof NotFoundException) {
            return res.status(Httpcode.NOT_FOUND).json({
                StatusCode: err.statusCode,
                Message: err.message
            });
        }
        if (err instanceof BadRequestException) {
            return res.status(err.statusCode).json({
                StatusCode: err.statusCode,
                Message: err.message
            });
        }
        if (err instanceof InternalServerException) {
            return res.status(Httpcode.INTERNAL_SERVER_ERROR).json({
                StatusCode: err.statusCode,
                Message: err.message
            });
        }
        if (err instanceof ValidationException) {
            return res.status(Httpcode.VALIDATION_ERROR).json({
                StatusCode: err.statusCode,
                Message: err.message
            });
        }
        // If the error is not one of the custom error classes, handle it as a generic internal server error
        logger.error(err)
        return res.status(Httpcode.INTERNAL_SERVER_ERROR).json({
            StatusCode: Httpcode.INTERNAL_SERVER_ERROR,
            Message: "An error occurred while processing your request. Please try again later.",
        });
    }
}

export default CustomErrorHandler;
