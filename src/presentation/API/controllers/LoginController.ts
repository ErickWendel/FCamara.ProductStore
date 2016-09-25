import * as Hapi from "hapi";
import Jwt from '../../../infra.core/auth/jwt';
import BaseController from './base/BaseController';
import LoginModel from '../../../domain/entities/DTO/LoginDto';
import ProductSchema from './../../../infra.dataAccess/schemas/ProductSchema';
import { ILoginApplication } from '../../../domain/contracts/application/ILoginApplication';
import { ILoginController } from '../../../domain/contracts/controllers/ILoginController';


export default class LoginController extends BaseController implements ILoginController{
    private _loginApp: ILoginApplication;
    constructor(server: Hapi.Server, loginApplication: ILoginApplication) {
        super(server);
        this._loginApp = loginApplication;
    }
    getToken = (request: Hapi.Request, reply: Hapi.IReply): Hapi.Response => {
        const token = new Jwt().setToken();
        const expiration = this._loginApp.getExpirationFromJwt(token);
        const model = <LoginModel>{ token: token, expiration: expiration };
        return reply(model);
    }
}

Object.seal(LoginController);