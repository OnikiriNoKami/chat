import {errorType} from '../utils/types';
class ApiError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }

    static badRequest(message) {
        return new ApiError(404, message);
    }

    static unauthorized(message) {
        return new ApiError(401, message);
    }

    static forbidden(message) {
        return new ApiError(403, message);
    }

    static badRequestSerialized(message) {
        return {
            type: errorType,
            status: 404,
            message,
        }
    }
}

export default ApiError;
