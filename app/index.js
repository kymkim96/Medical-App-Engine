const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
require("dotenv").config();
const { sequelize } = require("./models");
const swaggerUI = require("swagger-ui-express");
const spec = require("../swaggerUI");
const cors = require("cors");
const passport = require("passport");
const passportConfig = require("./auth");
const helmet = require("helmet");
const hpp = require("hpp");

const router = require("./router");

const app = express();
sequelize.sync();
passportConfig(passport);

app.set("port", process.env.PORT || 8010);

app.use("/swagger", swaggerUI.serve, swaggerUI.setup(spec));

/**
 * helmet, hpp : 취약점 방어
 */

if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
  app.use(helmet());
  app.use(hpp());
} else {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3010",
      "http://localhost:3001",
      "http://medical-admin-wheredowego.s3-website.ap-northeast-2.amazonaws.com",
      "http://wheretogohos.site",
    ],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-type", "Authorization", "Accept"],
  })
);
app.use(passport.initialize());

app.use("/", router);

// app.use((req, res, next) => {
//     const err = new Error('not found');
//     err.status = 404;
//     next(err);
// });
//
// app.use((err, req, res, next) => {
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};
//     res.status(err.status || 500).send({ message: 'error' });
// });

app.listen(app.get("port"), () => {
  console.log(`connect to http://localhost:${app.get("port")}`);
});
