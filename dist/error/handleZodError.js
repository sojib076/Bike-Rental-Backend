"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleZodError = (err) => {
    const errorSource = err.issues.map((issue) => {
        return {
            path: issue.path[issue.path.length - 1],
            message: issue.message,
        };
    });
    const statusCode = 400;
    return {
        statusCode,
        message: ' Zod Error Occured!',
        errorSource,
        stack: err === null || err === void 0 ? void 0 : err.stack
    };
};
exports.default = handleZodError;
