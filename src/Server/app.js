const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const config = require('config');

// router
const UserRoutes = require('../Components/User/Router');

// swagger docs
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

class App {
  constructor() {
    this.app = express();
    this.userRouter = new UserRoutes();
    this.port = config.get('app.port');
    this.config();
  }

  config() {
    // support application/json type post data
    this.app.use(bodyParser.json());

    //support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: false }));

    // parse content into JSON
    this.app.use(express.json());

    // serving static files
    this.app.use(express.static('public'));

    // HTTP request logger middleware
    this.app.use(morgan('dev'));

    // user router
    this.userRouter.routes(this.app);

    // set port
    this.app.set('port', this.port || 3030);

    // swagger documentation
    this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }
}

module.exports = new App().app;
