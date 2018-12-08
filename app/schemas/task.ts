import {Document, Schema, Model, model} from 'mongoose'
import {ITask} from '../interfaces/task';

export interface TaskModel extends ITask, Document { }

export var TaskSchema: Schema = new Schema({
    name: String,
    desc: String,
    created: {type: Date, default: Date.now}
});

export const Task: Model<TaskModel> = model<TaskModel>("Task", TaskSchema);