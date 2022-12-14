var express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const dotenv = require('dotenv');
dotenv.config();

const jwt = require("./config/jwt");
const core = require("./models");
const hooks = require('./hooks/index');
const { sio_init } = require('./socket-io');
var app = express();
app.options('*', cors())
app.use(cors({
  origin: ['*'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", 'true');
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept,Authorization"
  );
  next();
});

app.use('/api', jwt(), require('./routes/index'));

app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    console.log(err.message)
    return res.status(err.status).send({ message: err.message, code: '99' });
  } else {
    console.log({ err })
  }
  next();
});


const PORT = process.env.PORT || 5000;
app.use(express.static('public'))

var server = app.listen({ port: PORT, host: '0.0.0.0' }, async function () {
  console.log('listening for requests on port', PORT);


  core.secure().then(ok => {
    console.log("db connected - factory-crm")
    hooks.init()
    sio_init(server)
  }).catch(() => {
    console.log("db migrations - factory-crm")
    hooks.init()
    sio_init(server)
  })

});
