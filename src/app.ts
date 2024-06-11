import express, { Application, Request, Response } from "express";
import globalErrorHandler from "./middlewares/globalErrorhandler";
import router from "./routes";
import notFound from "./middlewares/notFound";

// import { MovieRoutes } from "./modules/movies/movies.route";

const app: Application= express();

//parsers
app.use(express.json());
// app.use(cors());

// application routes
app.use('/api/v1', router);

const test = async (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
};

app.get('/', test);

app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
