export class AppError extends Error {
    constructor(message, code, originalError = null) {
        super(message);
        this.name = 'AppError';
        this.code = code;
        this.originalError = originalError;
    }
}

export const handleAPIError = (error) => {
    if (error.response) {
        // Server responded with error status
        const status = error.response.status;
        const message = error.response.data?.message || 'Something went wrong';

        switch (status) {
            case 400:
                return new AppError(message, 'BAD_REQUEST', error);
            case 401:
                return new AppError('Please login again', 'UNAUTHORIZED', error);
            case 403:
                return new AppError('You do not have permission', 'FORBIDDEN', error);
            case 404:
                return new AppError('Resource not found', 'NOT_FOUND', error);
            case 500:
                return new AppError('Server error, please try again later', 'SERVER_ERROR', error);
            default:
                return new AppError(message, 'UNKNOWN_ERROR', error);
        }
    } else if (error.request) {
        // Request made but no response received
        return new AppError('Network error. Please check your connection.', 'NETWORK_ERROR', error);
    } else {
        // Something else happened
        return new AppError('An unexpected error occurred', 'UNKNOWN_ERROR', error);
    }
};

export const withErrorHandling = (fn, errorHandler) => {
    return async (...args) => {
        try {
            return await fn(...args);
        } catch (error) {
            const appError = handleAPIError(error);
            if (errorHandler) {
                errorHandler(appError);
            } else {
                console.error('Unhandled error:', appError);
            }
            throw appError;
        }
    };
};