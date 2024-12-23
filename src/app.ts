import { Server } from 'http';
import express, { Express } from 'express';
import { UserController } from './users/users.contoller';
import { ExeptionFilter } from './errors/exeption.filter';
import { ILogger } from './logger/logger.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from './types';
import 'reflect-metadata'
@injectable()
export class App{
    app: Express;
    port: number;
    server: Server;

    constructor(
        @inject(TYPES.ILogger) private logger: ILogger,
        @inject(TYPES.UserController) private userController: UserController,
        @inject(TYPES.ExeptionFilter) private exeptionFilter: ExeptionFilter
    ){
        this.app = express(); 
        this.port = 8000;
       
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





