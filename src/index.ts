import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import { HttpStatusCode } from './error/HttpStatusCode';
import { ResponseError } from './error/ResponseError';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());
app.use(methodOverride());

app.get('/', (_req, res) => {
  res.json({
    success: true,
    status: 200,
    message: "",
    data: "ok"
  });
});

app.get('/error-400', (_req: Request, _res: Response) => {
  throw new ResponseError(HttpStatusCode.BAD_REQUEST, "bad request");
});

app.get('/error-500', (_req, _res) => {
  throw new ResponseError(HttpStatusCode.INTERNAL_SERVER_ERROR, "error 500");
});

app.use((err: ResponseError, _req: Request, res: Response, _next: NextFunction) => {
  res.status(err.status).json({
    success: false,
    status: err.status,
    message: err.message,
    data: null,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});