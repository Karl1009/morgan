"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.failSafeHandler = exports.errorResponder = exports.errorLogger = exports.pathNotFound = void 0;
var yup_1 = require("yup");
var db_errors_1 = require("db-errors");
var exception_1 = __importDefault(require("./exception"));
var logger_1 = require("./utils/logger");
// const { RequestError } = require("mssql")
var pathNotFound = function (req, res, next) {
    var error = new exception_1.default("Not found - " + req.originalUrl, 404);
    next(error);
};
exports.pathNotFound = pathNotFound;
var errorLogger = function (error, req, res, next) {
    logger_1.logger.error('info', error);
    next(error);
};
exports.errorLogger = errorLogger;
var errorResponder = function (error, req, res, next) {
    error = db_errors_1.wrapError(error);
    if (error instanceof yup_1.ValidationError) {
        res.status(400).json({
            isSuccess: false,
            statusCode: res.statusCode,
            message: error.errors,
        });
    }
    else if (error instanceof db_errors_1.DBError
    // || error instanceof RequestError
    ) {
        res.status(400).json({
            isSuccess: false,
            statusCode: res.statusCode,
            message: "bad request - database error"
        });
    }
    else if (error.isCustomError) {
        res.status(error.statusCode || 200).json({
            isSuccess: false,
            statusCode: error.statusCode,
            message: error.message
        });
    }
    else
        next(error);
};
exports.errorResponder = errorResponder;
var failSafeHandler = function (error, req, res, next) {
    res.status(500).json({
        isSuccess: false,
        message: error.message
    });
};
exports.failSafeHandler = failSafeHandler;
