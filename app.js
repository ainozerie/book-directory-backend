const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");

const routes = require('./routes/routes');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

const corsOptions = {
    origin: '*'
  };
app.use(cors(corsOptions));

app.use(routes);

app.listen(8080);