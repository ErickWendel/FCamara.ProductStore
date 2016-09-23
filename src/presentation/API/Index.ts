/// <reference path="../../../typings/tsd.d.ts" />
import * as Hapi from 'hapi';
import Constants from './../../infra.core/config/constants/constants';
import Routes from './routes/Routes';
import * as fs from 'fs';
import * as path from 'path';
import {IPlugin} from '../../infra.core/plugins/interfaces'; 
import Swagger from '../../infra.core/plugins/swagger/swagger';
import Logger from '../../infra.core/plugins/logger/logger';

const port = process.env.port || Constants.SERVER.PORT;
const server = new Hapi.Server();

server.connection({ port: port });
const routes = new Routes(server);

[Swagger, Logger].map((fn: IPlugin) => fn().register(server)); 

server.start(function() { 
    console.log('Server running at:', server.info.uri);
});
