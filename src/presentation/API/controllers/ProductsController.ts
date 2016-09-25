import * as Hapi from "hapi";
import * as async from 'bluebird';
import * as Boom from 'boom';
import BaseController from './base/BaseController';
import { IProductController } from '../../../domain/contracts/controllers/IProductController';
import { IProductApplication } from '../../../domain/contracts/application/IProductApplication';


export default class ProductsController extends BaseController implements IProductController {
    private _productApplication: IProductApplication;

    constructor(server: Hapi.Server, productApplication: IProductApplication) {
        super(server);
        this._productApplication = productApplication;
    }

    list = (request: Hapi.Request | any, reply: Hapi.IReply): async<any> => {
        var skip: number = request.query.skip || 0;
        var limit: number = request.query.limit || 10;
        
        return this._productApplication
            .list(skip, limit)
            .then(reply)
            .catch((err) => reply(Boom.badRequest(`error on get: ${err}`)))
    }

    insertMany = (request: Hapi.Request, reply: Hapi.IReply): async<any> => {
        return this._productApplication
            .insertMany()
            .then(() => reply('OK'))
            .catch((err) => reply(Boom.badRequest(`error on insert ${err}`)));
    }
}
Object.seal(ProductsController);