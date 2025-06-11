import pkg from 'http-status-codes';
const { StatusCodes, ReasonPhrases } = pkg

class SuccessResponse {
    constructor({
        message = ReasonPhrases.OK,
        statusCode = StatusCodes.OK,
        status = 'success',
        metadata = {},
    }) {
        this.message = message;
        this.statusCode = statusCode;
        this.status = status;
        this.metadata = metadata;
    }

    send(res) {
        return res.status(this.statusCode).json({
            status: this.status,
            code: this.statusCode,
            message: this.message,
            metadata: this.metadata,
        });
    }
}

class OK extends SuccessResponse {
    constructor({ message = ReasonPhrases.OK, metadata }) {
        super({ message, metadata });
    }
}

class CREATED extends SuccessResponse {
    constructor({
        message = ReasonPhrases.CREATED,
        statusCode = StatusCodes.CREATED,
        metadata,
        options = {},
    }) {
        super({ message, statusCode, metadata });
        this.options = options;
    }
}

export {
    OK,
    CREATED
}