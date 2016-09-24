/// <reference path="../../../../typings/tsd.d.ts" />

import * as Hapi from "hapi";
import * as Promise from 'bluebird';
import * as Boom from 'boom';
import "reflect-metadata";
import { injectable, inject, } from "inversify";
import { IProductController } from '../../../domain/contracts/controllers/IProductController';
import { IProductApplication } from '../../../domain/contracts/application/IProductApplication';
import BaseController from './base/BaseController';




export default class ProductsController extends BaseController implements IProductController {
    private _productApplication: IProductApplication;

    constructor(server: Hapi.Server, productApplication: IProductApplication) {
        super(server);
        this._productApplication = productApplication;
    }
    list = (request: Hapi.Request, reply: Hapi.IReply): Promise<Object> => {
        return this._productApplication
            .list()
            .then(reply)
            .catch((err) => reply(Boom.badRequest(`error on get: ${err}`)))


    }
    insertMany = (request: Hapi.Request, reply: Hapi.IReply): Promise<Object> => {
        return this._productApplication
            .insertMany()
            .then(() => reply('OK'))
            .catch((err) => reply(Boom.badRequest(`error on insert ${err}`)));
    }




}