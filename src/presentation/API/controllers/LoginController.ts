import * as Hapi from "hapi";
import * as Boom from "boom";
import Jwt from '../../../infra.core/auth/jwt';
import BaseController from './base/BaseController';
import LoginModel from '../../../domain/entities/DTO/LoginDto';
import { ILoginApplication } from '../../../domain/contracts/application/ILoginApplication';
import { ILoginController } from '../../../domain/contracts/controllers/ILoginController';


export default class Login extends BaseController implements ILoginController{
    private _loginApp: ILoginApplication;
    constructor(server: Hapi.Server, loginApplication: ILoginApplication) {
        super(server);
        this._loginApp = loginApplication;

    }
    getToken = (request: Hapi.Request, reply: Hapi.IReply): Hapi.Response => {
        const token = new Jwt().setToken(123);
        const expiration = this._loginApp.getExpirationFromJwt(token);
        const model = <LoginModel>{ token: token, expiration: expiration };
        return reply(model);
    }
}