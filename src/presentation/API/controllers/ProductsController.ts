/// <reference path="../../../../typings/tsd.d.ts" />

import * as Hapi from "hapi";
import * as Boom from "boom";
import "reflect-metadata";
import { injectable, inject, } from "inversify";
import { IProductController } from '../../../domain/contracts/controllers/IProductController';
import { IProductApplication } from '../../../domain/contracts/application/IProductApplication';
import BaseController from './base/BaseController';




export default class ProductsController extends BaseController implements IProductController {
    private productApplication: IProductApplication;

    constructor(server: Hapi.Server, productApplication: IProductApplication) {
        super(server);
        this.productApplication = productApplication;
    }
    public products(request: Hapi.Request, reply: Hapi.IReply): Hapi.Response {
        const id = request.params["id"];
        if (1 === 1)
            return reply(true);

        // else if (2 === 2)
        //     return reply(Boom.notFound());

        return reply(Boom.badImplementation(null));
    }

}