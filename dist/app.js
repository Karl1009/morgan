"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
var morgan_1 = __importDefault(require("morgan"));
var log4js_1 = __importDefault(require("log4js"));
var error_1 = require("./error");
dotenv_1.default.config();
var _a = process.env, PORT = _a.PORT, NODE_ENV = _a.NODE_ENV;
var app = express_1.default();
app.use(cors_1.default({ credentials: true,
    exposedHeaders: ['Content-Disposition'],
}));
var theAppLog = log4js_1.default.getLogger();
// const theMorgan = morgan("combined", {
//     "stream": {
//     write: function(str) { theAppLog.debug(str); }
// }
// });
var theMorgan = morgan_1.default(":method :url :status :res[content-length] - :response-time ms");
app.use(theMorgan);
// app.use(express.json())
app.use('/', function (req, res, next) {
    throw new Error("testing only");
    console.log('I am middleware');
    next();
});
app.get('/', function (req, res, next) {
    res.json({
        isSuccess: true
    });
    console.log('Hello World');
});
app.get('/health', function (req, res) {
    console.log('I am super healthy');
    // throw new Error('create Error')
    return res.status(200).json({
        isSuccess: true,
        data: { name: "karl2" }
    });
});
app.use('*', function (req, res) {
    return res.status(404).json({
        isSuccess: false
    });
});
app.use(error_1.pathNotFound);
app.use(error_1.errorLogger);
app.use(error_1.errorResponder);
app.use(error_1.failSafeHandler);
app.use;
app.listen(PORT, function () {
    console.log("Listening to http://localhost:" + PORT + " - " + NODE_ENV);
});
