"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var moment_1 = __importDefault(require("moment"));
var task_1 = require("./schemas/task");
var router = express_1.Router();
router.get('/', function (req, res) {
    task_1.Task.find(function (err, response) {
        res.render('list', {
            tasks: response,
            moment: moment_1.default
        });
    });
});
router.get('/addTask', function (req, res) {
    res.render('newTask');
});
router.post('/addTask', function (req, res) {
    var newTask = req.body;
    if (!newTask.name || !newTask.desc) {
        res.render('newTask', {
            error: "Task must have a name and a description"
        });
    }
    else {
        var task = new task_1.Task({
            name: newTask.name,
            desc: newTask.desc,
            created: Date.now()
        });
        task.save();
        res.redirect('/');
    }
});
router.post('/deleteTask', function (req, res) {
    task_1.Task.findOneAndDelete({ _id: req.body.id }, function (err, response) {
        if (err != null) {
            console.log("Couldn't delete: " + err);
        }
    });
    res.redirect('/');
});
exports.AppRouter = router;
