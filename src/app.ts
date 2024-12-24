import { PrismaService } from './database/prisma.service';
import { ConfigService } from './config/config.service';
import { Server } from 'http';
import express, { Express } from 'express';
import { UserController } from './users/users.contoller';
import { ExeptionFilter } from './errors/exeption.filter';
import { ILogger } from './logger/logger.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from './types';
import {json} from 'body-parser'
import 'reflect-metadata'
import { IConfigService } from './config/config.service.interface';
import { IUserController } from './users/users.interface';
import { IExeptionFilter } from './errors/exeption.filter.interface';

@injectable()
export class App{
    app: Express;
    port: number;
    server: Server;

    constructor(
        @inject(TYPES.ILogger) private logger: ILogger,
        @inject(TYPES.UserController) private userController: UserController,
        @inject(TYPES.ExeptionFilter) private exeptionFilter: IExeptionFilter,
        @inject(TYPES.ConfigService) private configService: IConfigService,
        @inject(TYPES.PrismaService) private prismaService: PrismaService
    ){
        this.app = express(); 
        this.port = 8000;
       
    }
    
    useMiddleware(): void{
        this.app.use(json());
    }

    useRoutes(): void{
        this.app.use('/users', this.userController.router);
    }

    useExeprionFilters(): void{
        this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter))
    }

    public async init(): Promise<void>{
        this.useMiddleware();
        this.useRoutes();
        this.useExeprionFilters();
        this.prismaService.connect();
        this.server = this.app.listen(this.port);
        this.logger.log(`Сервер запущен на http://localhost:${this.port}`)

    }
}





