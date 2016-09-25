/// <reference path="../../../typings/tsd.d.ts" />
import * as Hapi from 'hapi';
import Constants from './../../infra.core/config/constants/constants';
import Routes from './routes/Routes';
import Swagger from '../../infra.core/plugins/swagger/swagger';
import Logger from '../../infra.core/plugins/logger/logger';
import { IPlugin } from '../../infra.core/plugins/interfaces';

const port = process.env.port || Constants.SERVER.PORT;
const server = new Hapi.Server();

server.connection({ port: port,  routes: { cors: true }});
const routes = new Routes(server);

[Swagger, Logger].map((fn: any) => fn.register(server));

server.start(function () {
    console.log('Server running at:', server.info.uri);
});
