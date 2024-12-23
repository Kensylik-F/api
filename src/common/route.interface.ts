import { NextFunction, Request, Response, Router } from "express";



export interface IControllerRoute{
    path: string;
    func:(req:Request, res: Response, next: NextFunction) => void;
    method: keyof Pick<Router, 'get' | 'post' | 'delete' | 'patch' | 'put'>
}

// Pick - утилитарный тип который берет значения которые мы передадим и создает новый интерфейс
 