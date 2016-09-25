import { IPlugin, IPluginInfo } from '../interfaces'
import * as Hapi from 'hapi';
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');

export default class Swagger {

   static info() {
        return {
            name: "Swagger Documentation",
            version: "1.0.0"
        };
    }

   static register(server: Hapi.Server) {
        server.register([
            Inert,
            Vision,
            {
                'register': HapiSwagger,
                'options': {
                    info: {
                        'title': 'Product Store Documentation',
                        'version': '1.0',
                    }
                }
            }]);
    }
}
Object.seal(Swagger);