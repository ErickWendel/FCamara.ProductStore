import { IPlugin } from '../interfaces'
import * as Hapi from 'hapi'
import Constants from '../../config/constants/constants';
const Good = require('good');
const GoodConsole = require('good-console');
 
export default class Logger {

    static info(): Object {
        return {
            name: "Good Logger",
            version: "1.0.0"
        };
    }
   static register(server: Hapi.Server) {
        server.register({
            register: Good,
            options: this.getOptions()
        });


    }
   static getOptions(): Object {
        const options = {
            ops: {
                interval: 1000
            },
            reporters: {
                ConsoleReporter: [{
                    module: 'good-squeeze',
                    name: 'Squeeze',
                    args: [{ log: '*', response: '*' }]
                }, {
                    module: 'good-console'
                }, 'stdout'],
                FileReporter: [{
                    module: 'good-squeeze',
                    name: 'Squeeze',
                    args: [{ ops: '*' }]
                }, {
                    module: 'good-squeeze',
                    name: 'SafeJson'
                }, {
                    module: 'good-file',
                    args: ['./logs/log.json']
                }],
                HTTPReporter: [{
                    module: 'good-squeeze',
                    name: 'Squeeze',
                    args: [{ error: '*' }]
                }, {
                    module: 'good-http',
                    args: [`http://${Constants.SERVER.HOST}:${Constants.SERVER.PORT}/logs`, {
                        wreck: {
                            headers: { 'x-api-key': 12345 }
                        }
                    }]
                }]
            }
        };
        return options;
    }
}
Object.seal(Logger);
