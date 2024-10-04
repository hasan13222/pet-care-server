import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './app/routes';
import { notFoundHandler } from './app/middleware/notFoundHandler';
import { globalErrorHandler } from './app/middleware/globalErrorHander';
const app: Application = express();

// cors middleware
const corsOptions = {
  origin: ['http://localhost:5173', 'https://bike-rental-frontend-eight.vercel.app'], 
  credentials: true,
};
app.use(cors(corsOptions));

app.options("*", cors(corsOptions))
// json parser
app.use(express.json());
// cookie parser
app.use(cookieParser());

// application routes
app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello Biker! Welcome to the Biker Rental Service.');
});


// not found route handler
app.all('*', notFoundHandler);

// global error handler
app.use(globalErrorHandler);

export default app;
