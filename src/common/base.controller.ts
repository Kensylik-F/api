import { Response, Router } from "express";
import { LoggerService } from "../logger/logger.service";
import { IControllerRoute } from "./route.interface";
import { ILogger } from "../logger/logger.interface";
import { injectable } from "inversify";
export {Router} from 'express'
import 'reflect-metadata'



@injectable()
export abstract class BaseController{

    private readonly _router: Router;
    constructor(private logger: ILogger){
        this._router = Router();

    }

    get router() {
        return this._router;
    }
    public send<T>(res: Response, code: number, message: T){
        res.type('application/json');
        return res.status(code).json(message);
    }
    public ok<T>(res: Response, message: T){
        return this.send<T>(res, 200, message);
    }
    public created(res: Response){
        return res.sendStatus(201);
    }

    protected bindRoutes(routes: IControllerRoute[]){
        for(const route of routes){
            this.logger.log(`[${route.method}] ${route.path}`);
            const middleware = route.middlewars?.map((m) => m.execute.bind(m));
            const handler = route.func.bind(this);
            const pipeline = middleware ? [...middleware, handler] : handler;
            this.router[route.method](route.path, pipeline);
        }
    }
}