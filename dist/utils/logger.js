"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
var winston_1 = __importDefault(require("winston"));
var _a = winston_1.default.format, combine = _a.combine, timestamp = _a.timestamp, label = _a.label, printf = _a.printf;
var myFormat = printf(function (_a) {
    var level = _a.level, message = _a.message, label = _a.label, timestamp = _a.timestamp;
    return timestamp + " [" + label + "] " + level + ": " + message;
});
var opts = {
    filename: 'logs/log-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    maxSize: '20m',
    maxFiles: '14d'
};
var logger = winston_1.default.createLogger({
    levels: {
        alert: 0,
        error: 1,
        debug: 2,
        info: 3
    },
    // level: 'info',
    format: combine(label({ label: 'right meow!' }), timestamp(), myFormat),
    transports: [
        new winston_1.default.transports.Console(),
    ],
});
exports.logger = logger;
