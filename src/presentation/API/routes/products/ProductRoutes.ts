import "reflect-metadata";
import { injectable, inject, } from "inversify";
import * as Hapi from "hapi";
import { BaseRoutes } from '../base/BaseRoutes';
import ProductController from '../../controllers/ProductsController';
import { KernelConfig } from './../../../../infra.core.ioC/config/Config';
import { IProductApplication } from './../../../../domain/contracts/application/IProductApplication';
import { IBaseRoute as IBaseRoute } from '../../../../domain/contracts/routes/IBaseRoute';
import Constants from './../../../../infra.core/config/constants/constants';
import Product from './../../../../domain/entities/Product';;
export class ProductRoutes extends BaseRoutes implements IBaseRoute {
    private _productController: ProductController;

    constructor(server: Hapi.Server) {
        super(server);
        const kernel = KernelConfig();
        const product = kernel.get<IProductApplication>("ProductApplication");
        this._productController = new ProductController(server, product);

    }

    public init(): Hapi.Server {
        this._server.route(
            <Hapi.IRouteConfiguration>{
                method: 'GET',
                path: '/products',
                config: {
                    handler: this._productController.products,
                    description: 'Listar Produtos ',
                    notes: 'Retorna a lista de produtos',
                    tags: ['api'],
                    auth: {
                        strategies: [Constants.JWT.STRATEGY]
                    }
                },

            });

        return this._server;
    }
} 