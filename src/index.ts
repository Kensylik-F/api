import express, {Request, Response, NextFunction} from 'express';
import { useRouter } from './users/users.js';

const port = 8000;
const app = express();

app.use((req, res, next)=>{
    console.log('TIME: ', Date.now());
    next();
})
app.get('/hello', (req, res) =>{
    throw new Error('error!!!!!');
})

app.use('/users', useRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction)=>{
    console.log(err.message);
    res.status(500).send(err.message);
})
app.listen(port, () =>{
    console.log(`Server: http://localhost:${port}`);

})

