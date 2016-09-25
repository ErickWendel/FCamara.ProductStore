import "reflect-metadata";
import { injectable, inject, } from "inversify";
import * as Hapi from "hapi";
import BaseRoutes from '../base/BaseRoutes';
import ProductController from '../../controllers/ProductsController';
import KernelConfig from './../../../../infra.core.ioC/config/Config';
import Constants from './../../../../infra.core/config/constants/constants';
import Product from './../../../../domain/entities/Product';
import { IProductApplication} from './../../../../domain/contracts/application/IProductApplication';
import { IBaseRoute } from '../../../../domain/contracts/routes/IBaseRoute';
const config = require('../../../../../config');

export default class ProductRoutes extends BaseRoutes implements IBaseRoute {
    private _productController: ProductController;

    constructor(server: Hapi.Server) {
        super(server);
        const kernel = KernelConfig();
        const product = kernel.get<IProductApplication>("IProductApplication");
        this._productController = new ProductController(server, product);

    }

    public init(): Hapi.Server {
        this._server.route(
            <Hapi.IRouteConfiguration>{
                method: config.endpoints.product.list.type,
                path: config.endpoints.product.list.url,
                config: {
                    handler: this._productController.list,
                    description: 'Product List ',
                    notes: 'Returns the product list',
                    tags: ['api'],
                    auth:
                    {
                        strategies: [Constants.JWT.STRATEGY]
                    }
                },

            });
        this._server.route(
            <Hapi.IRouteConfiguration>{
                method: config.endpoints.product.insertMany.type,
                path: config.endpoints.product.insertMany.url,
                config: {
                    handler: this._productController.insertMany,
                    description: 'Insert Initial Data',
                    notes: 'Insert fake data in database',
                    tags: ['api'],
                    auth:
                    {
                        strategies: [Constants.JWT.STRATEGY]
                    }
                },

            });


        return this._server;
    }
} 