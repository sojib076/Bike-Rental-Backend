import express, { Application, Request, Response } from "express";
import globalErrorHandler from "./middlewares/globalErrorhandler";
import router from "./routes";
import notFound from "./middlewares/notFound";

// import { MovieRoutes } from "./modules/movies/movies.route";

const app: Application= express();

//parsers
app.use(express.json());


// application routes
app.use('/api', router);

const test = async (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
};

app.get('/',(req: Request, res: Response) => { res.send('Hello World'); });

app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
