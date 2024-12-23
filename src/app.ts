import { Server } from 'http';
import express, { Express } from 'express';
import { LoggerService } from './logger/logger.service';
// import { useRouter } from './users/users';
import { UserController } from './users/users.contoller';
import { ExeptionFilter } from './errors/exeption.filter';
import { ILogger } from './logger/logger.interface';


export class App{
    app: Express;
    port: number;
    server: Server;
    logger: ILogger;
    userController: UserController;
    exeptionFilter: ExeptionFilter;

    constructor(
        logger: ILogger,
        userController: UserController,
        exeptionFilter: ExeptionFilter
    ){
        this.app = express(); 
        this.port = 8000;
        this.logger = logger;
        this.userController = userController;
        this.exeptionFilter = exeptionFilter;
    }

    useRoutes(){
        this.app.use('/users', this.userController.router);
    }

    useExeprionFilters(){
        this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter))
    }

    public async init(){
        this.useRoutes();
        this.useExeprionFilters()
        this.server = this.app.listen(this.port);
        this.logger.log(`Сервер запущен на http://localhost:${this.port}`)

    }
}





