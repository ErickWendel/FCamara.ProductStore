import * as Hapi from 'hapi';
const inert = require('inert');
import *  as  path from 'path'; 

import { ProductController } from '../controllers/ProductController';
export default class Route {

    constructor(server: Hapi.Server, controller: ProductController) {
        this.init(server, controller);
    }

    init = (server: Hapi.Server, controller: ProductController): Hapi.Server => {

        const home = <Hapi.IRouteConfiguration>{
            method: 'GET',
            path: '/',
            // config: {
            //     handler: controller.home,
            // },
            handler: {
                file: path.join(__dirname, "../../content/index.html")
            }
        };
        // {
        //     method: 'GET',
        //     path: '/',
        //     config: {
        //         handler: controller.home,
        //     },

        // }
        server.route(home);
        return server;

    }
}
