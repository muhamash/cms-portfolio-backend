import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application } from "express";
import { globalErrorResponse } from './middleware/globalError.middleware';
import { globalNotFoundResponse } from './middleware/globalNotfound.middleware';
import { homeRouter } from './module/home/home.route';

const app: Application = express();


app.use( cookieParser() );
app.use( express.json() );
app.use( cors( {
    origin: [ "http://localhost:5173", "http://localhost:3000" ],
    // credentials: true
} ) );

app.use( "/", homeRouter );


app.use( globalNotFoundResponse )
app.use( globalErrorResponse )


export default app;