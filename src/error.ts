import { Handler, ErrorRequestHandler } from 'express'
import { ValidationError } from "yup";
import { wrapError, DBError } from 'db-errors'
import Exception from "./exception";
import { logger, logLevel } from "./utils/logger";
// const { RequestError } = require("mssql")

export const pathNotFound: Handler = (req, res, next) => {
    const error = new Exception(`Not found - ${req.originalUrl}`, 404);
    next(error)
}

export const errorLogger: ErrorRequestHandler = (error, req, res, next) => { // for logging errors
    logger.error('info', error)
    next(error) 
  }

export const errorResponder: ErrorRequestHandler = (error, req, res, next) => {
    error = wrapError(error);
    if (error instanceof ValidationError) {
        res.status(400).json({
            isSuccess: false,
            statusCode: res.statusCode,
            message: error.errors,
        })
    }
    else if (error instanceof DBError 
         // || error instanceof RequestError
        ) {
        res.status(400).json({
            isSuccess: false,
            statusCode: res.statusCode,
            message: "bad request - database error"
        })
    }
    else if (error.isCustomError) {
        res.status(error.statusCode || 200).json({
            isSuccess: false,
            statusCode: error.statusCode,
            message: error.message
        })
    }
    else next(error);
}


export const failSafeHandler : ErrorRequestHandler  = (error, req, res, next) => { // generic handler
    res.status(500).json({
        isSuccess: false,
        message: error.message
    })
  }
  