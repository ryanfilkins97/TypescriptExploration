"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var https_1 = __importDefault(require("https"));
var fs_1 = __importDefault(require("fs"));
var body_parser_1 = __importDefault(require("body-parser"));
var path_1 = __importDefault(require("path"));
var mongoose_1 = __importDefault(require("mongoose"));
var router_1 = require("./router");
var app = express_1.default();
var options = {
    key: fs_1.default.readFileSync("/home/rmfvg5/server/encryption/server.key"),
    cert: fs_1.default.readFileSync("/home/rmfvg5/server/encryption/ryanfilkins.site.crt"),
    ca: fs_1.default.readFileSync("/home/rmfvg5/server/encryption/intermediate.crt")
};
mongoose_1.default.connect('mongodb://localhost/ts-todo-app', { useNewUrlParser: true }).catch(function (error) {
    console.log("Error connecting to MongoDB: " + error);
});
app.set('view engine', 'pug');
app.set('views', path_1.default.join(__dirname, '../views'));
var parserUrlOptions = {
    extended: true
};
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded(parserUrlOptions));
app.use('/', router_1.AppRouter);
https_1.default.createServer(options, app).listen(7070);
