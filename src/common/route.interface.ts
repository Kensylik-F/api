import { NextFunction, Request, Response, Router } from "express";
import { IMiddleware } from "./middleware.interface";



export interface IControllerRoute{
    path: string;
    func:(req:Request, res: Response, next: NextFunction) => void;
    method: keyof Pick<Router, 'get' | 'post' | 'delete' | 'patch' | 'put'>
    middlewars?: IMiddleware[];
}

// Pick - утилитарный тип который берет значения которые мы передадим и создает новый интерфейс
 