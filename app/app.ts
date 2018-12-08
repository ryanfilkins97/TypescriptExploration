import express from 'express';
import https from 'https';
import fs from 'fs';
import bodyParser from 'body-parser';
import path from 'path';
import mongoose from 'mongoose';

import {AppRouter} from './router';

const app: express.Application = express();

const options: https.ServerOptions = {
    key: fs.readFileSync("/home/rmfvg5/server/encryption/server.key"),
    cert: fs.readFileSync("/home/rmfvg5/server/encryption/ryanfilkins.site.crt"),
    ca: fs.readFileSync("/home/rmfvg5/server/encryption/intermediate.crt")
};

mongoose.connect('mongodb://localhost/ts-todo-app', {useNewUrlParser: true}).catch((error: any) => {
    console.log("Error connecting to MongoDB: " + error);
});

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../views'));

const parserUrlOptions: bodyParser.OptionsUrlencoded = {
    extended: true
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded(parserUrlOptions));

app.use('/', AppRouter);

https.createServer(options, app).listen(7070);