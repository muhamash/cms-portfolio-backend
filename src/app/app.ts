import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application } from "express";
import { globalErrorResponse } from './middleware/globalError.middleware';
import { globalNotFoundResponse } from './middleware/globalNotfound.middleware';
import { homeRouter } from './module/home/home.route';
import { servicesRouter } from './routes/service.route';

const app: Application = express();

app.use( cookieParser() );
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use( cors( {
    origin: [ "http://localhost:3000", "http://localhost:3001", "https://cms-portfolio-with-resume-builder.vercel.app/" ],
    credentials: true
} ) );

app.use( "/", homeRouter );

app.use( "/v1", servicesRouter )


app.use( globalNotFoundResponse )
app.use( globalErrorResponse )


export default app;