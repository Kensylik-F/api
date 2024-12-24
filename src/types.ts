import { ConfigService } from "./config/config.service";
import { PrismaService } from "./database/prisma.service";
import { UserService } from "./users/user.service";

export const TYPES = {
    Application: Symbol.for('Application'),
    ILogger: Symbol.for('ILogger'),
    UserController: Symbol.for('UserController'),
    UserService: Symbol.for('UserService'),
    ExeptionFilter: Symbol.for('ExeptionFilter'),
    ConfigService: Symbol.for('ConfigService'),
    PrismaService: Symbol.for('PrismaService')
}