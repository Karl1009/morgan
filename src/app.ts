import express from "express"
import cors from 'cors'
import dotenv from "dotenv"
import morgan from "morgan";
import log4js from 'log4js'
import { failSafeHandler, errorResponder, errorLogger, pathNotFound } from './error';
dotenv.config();
const { PORT, NODE_ENV } = process.env
const app = express()
app.use(cors(
    { credentials: true,
        exposedHeaders: ['Content-Disposition'],
    
    }
    ))

const theAppLog = log4js.getLogger();
// const theMorgan = morgan("combined", {
//     "stream": {
//     write: function(str) { theAppLog.debug(str); }
// }
// });

const theMorgan = morgan(":method :url :status :res[content-length] - :response-time ms")
app.use(theMorgan)
// app.use(express.json())

app.use('/', (req, res, next) => {
    throw new Error("testing only")
    console.log('I am middleware')
    next();
})

app.get('/', (req, res, next) => {
    res.json({
        isSuccess: true
    })
    console.log('Hello World')
})

app.get('/health', (req, res) => {
    console.log('I am super healthy')
    // throw new Error('create Error')
    return res.status(200).json({
        isSuccess: true,
        data: { name: "karl2" }
    }
    )
})

app.use('*', (req, res) => {
    return res.status(404).json({
        isSuccess: false
    })
})

app.use(pathNotFound)
app.use(errorLogger)
app.use(errorResponder)
app.use(failSafeHandler)
app.use

app.listen(PORT, () => {
    console.log(`Listening to http://localhost:${PORT} - ${NODE_ENV}`)
})
