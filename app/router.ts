import {Router, Request, Response} from 'express';
import moment from 'moment';
import {Task, TaskModel} from './schemas/task';

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
    Task.find((err: any, response: TaskModel[]) => {
        res.render('list', {
            tasks: response,
            moment: moment
        });
    });
});

router.get('/addTask', (req: Request, res: Response) => {
    res.render('newTask');
});

router.post('/addTask', (req: Request, res: Response) => {
    var newTask: any = req.body;
    
    if(!newTask.name || !newTask.desc){
        res.render('newTask', {
            error: "Task must have a name and a description"
        })
    } else {
        var task = new Task({
            name: newTask.name,
            desc: newTask.desc,
            created: Date.now()
        });

        task.save();

        res.redirect('/');
    }
});

router.post('/deleteTask', (req: Request, res: Response) => { 
    Task.findOneAndDelete({_id: req.body.id}, (err: any, response: any) => {
        if(err != null){
            console.log("Couldn't delete: " + err);
        }
    });

    res.redirect('/');
});

export const AppRouter: Router = router;