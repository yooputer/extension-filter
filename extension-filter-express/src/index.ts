import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
const cors = require('cors');
import * as bodyParser from "body-parser";
import {AppRoutes} from "./routes";

const port = process.env.PORT || 3000;

createConnection().then(async connection => {

    const app = express();
    app.use(bodyParser.json());
    app.use(cors()); // TODO: cors 설정

    AppRoutes.forEach(route => {
        app[route.method](route.path, (request: Request, response: Response, next: Function) => {
            route.action(request, response)
                .then(() => next)
                .catch(err => next(err));
        });
    });

    app.listen(port);

    console.log("Express application is up and running on port", port);

}).catch(error => console.log("TypeORM connection error: ", error));