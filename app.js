'use strict';

const SwaggerExpress = require('swagger-express-mw');
const app = require('express')();
const Mongoose = require("mongoose");
const DB_URL = require("./api/constants/database").URL;

const logRequest = (req, res, next) => {
  console.log(req.method, req.originalUrl, req.body)
  next();
}

app.use(logRequest)

Mongoose.connect(DB_URL, function (err) {
  if (!err) {
    console.log("Connected to the DB");
    const config = {
      appRoot: __dirname // required config
    };

    SwaggerExpress.create(config, function (err, swaggerExpress) {
      if (err) { throw err; }

      // install middleware
      swaggerExpress.register(app);

      const port = process.env.PORT || 10010;
      app.listen(port);

      if (swaggerExpress.runner.swagger.paths['/hello']) {
        console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
      }
    });
  } else {
    // 
    console.error("error " + err.message);
  }
});




module.exports = app; // for testing

