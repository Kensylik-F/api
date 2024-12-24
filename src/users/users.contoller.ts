import { TYPES } from './../types';
import { NextFunction, Request, Response } from "express";
import { BaseController } from "../common/base.controller";
import { HTTPError } from "../errors/http-error.class";
import { inject, injectable } from "inversify";
import { ILogger } from '../logger/logger.interface';
import 'reflect-metadata'
import { IUserController } from "./users.interface";
import { UserLoginDto } from "./dto/user-login.dto";
import { UserRegisterDto } from "./dto/user-register.dto";
import { User } from "./user.entity";
import { UserService } from './user.service';
import { ValidateMiddleware } from '../common/validate.middleware';


@injectable()
export class UserController extends BaseController implements IUserController{
    
    constructor(
        @inject(TYPES.ILogger) private loggerService: ILogger,
        @inject(TYPES.UserService) private userService:  UserService
    ){
        super(loggerService)
        this.bindRoutes([
            {path: '/register', method: 'post', func: this.register, middlewars: [new ValidateMiddleware(UserRegisterDto)]},
            {path: '/login', method: 'post', func: this.login},
        ])
    }

    login( req: Request<{},{},UserLoginDto> ,res: Response, next: NextFunction ): void{
        // this.ok(res, 'login');
        console.log(req.body);
        next(new HTTPError(401, 'ошибка авторизации', 'login'));

    }

    async register({body}: Request<{},{},UserRegisterDto> ,res: Response,  next: NextFunction ): Promise<void>{
        const result = await this.userService.createUser(body);
        if(!result){
            return next(new HTTPError(422, 'пользователь с таким email уже зарегистрирован'))
        }
        this.ok(res, {email: result.email})
    }

}