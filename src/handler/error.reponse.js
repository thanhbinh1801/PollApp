import pkg from 'http-status-codes';
const { StatusCodes, ReasonPhrases } = pkg

class ErrorResponse extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}

class ConflictRequestError extends ErrorResponse {
    constructor(
        message = ReasonPhrases.CONFLICT,
        statusCode = StatusCodes.CONFLICT
    ) {
        super(message, statusCode);
    }
}

class BadRequestError extends ErrorResponse {
    constructor(
        message = ReasonPhrases.BAD_REQUEST,
        statusCode = StatusCodes.BAD_REQUEST
    ) {
        super(message, statusCode);
    }
}

class AuthFailureError extends ErrorResponse {
    constructor(
        message = ReasonPhrases.UNAUTHORIZED,
        statusCode = StatusCodes.UNAUTHORIZED
    ) {
        super(message, statusCode);
    }
}

class NotFoundError extends ErrorResponse {
    constructor(
        message = ReasonPhrases.NOT_FOUND,
        statusCode = StatusCodes.NOT_FOUND
    ) {
        super(message, statusCode);
    }
}

class TokenExpiredError extends ErrorResponse {
    constructor(           
        message = ReasonPhrases.UNAUTHORIZED,
        statusCode = StatusCodes.UNAUTHORIZED
    ) {
        super(message, statusCode);
    }
}

export {
    ErrorResponse,      
    ConflictRequestError,
    BadRequestError,    
    AuthFailureError,
    NotFoundError
}