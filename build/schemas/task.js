"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
exports.TaskSchema = new mongoose_1.Schema({
    name: String,
    desc: String,
    created: { type: Date, default: Date.now }
});
exports.Task = mongoose_1.model("Task", exports.TaskSchema);
