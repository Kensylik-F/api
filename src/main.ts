import { Container, ContainerModule, interfaces } from "inversify";
import { App } from "./app";
import { ExeptionFilter } from "./errors/exeption.filter";
import { LoggerService } from "./logger/logger.service";
import { UserController } from "./users/users.contoller";
import { ILogger } from "./logger/logger.interface";
import { TYPES } from "./types";
import { IExeptionFilter } from "./errors/exeption.filter.interface";
import { IUserService } from "./users/user.service.interface";
import { UserService } from "./users/user.service";
import { IUserController } from "./users/users.interface";
import { IConfigService } from "./config/config.service.interface";
import { ConfigService } from "./config/config.service";
import { PrismaService } from "./database/prisma.service";


export interface IBootstrap{
    appContainer: Container,
    app: App
}
export const appBindings = new ContainerModule((bind: interfaces.Bind)=>{
    bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
    bind<IUserController>(TYPES.UserController).to(UserController).inSingletonScope()
    bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter).inSingletonScope()
    bind<IUserService>(TYPES.UserService).to(UserService).inSingletonScope()
    bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope()
    bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope()
    bind<App>(TYPES.Application).to(App)
})

function bootstrap():IBootstrap{
    const appContainer = new Container();   
    appContainer.load(appBindings);
    const app = appContainer.get<App>(TYPES.Application);
    app.init();
    return {app, appContainer}
}

export const{ app, appContainer} = bootstrap();