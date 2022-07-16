const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());
app.use(methodOverride());

function ResponseError(status, message) {
  this.status = status;
  this.message = message;
}

app.get('/', (_req, res) => {
  res.json({
    success: true,
    status: 200,
    data: "1",
  });
});

app.get('/error', (_req, _res) => {
  throw new ResponseError(500, "error 400");
});

app.get('/error1', (_req, _res) => {
  throw new ResponseError(400, "error 400");
});

app.use((err, _req, res, _next) => {
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