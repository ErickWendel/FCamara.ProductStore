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
// // ---------

// console.log(Util.getName())

// interface Warrior {
//     fight(): string;
//     sneak(): string;
// }
// let TYPES = {
//     Warrior: Symbol("Warrior"),
//     Weapon: Symbol("Weapon"),
//     ThrowableWeapon: Symbol("ThrowableWeapon")
// };


// interface Weapon {
//     hit(): string;
// }

// interface ThrowableWeapon {
//     throw(): string;
// }
 


// // @injectable()
// // class Katana implements Weapon {
// //     public hit() {
// //         return "cut!";
// //     }
// // }

// @injectable()
// class Shuriken implements ThrowableWeapon {
//     public throw() {
//         return "hit!";
//     }
// }

// @injectable()
// class Ninja implements Warrior {

//     private _katana: Weapon;
//     private _shuriken: ThrowableWeapon;

//     public constructor(
//         @inject(ClassTypes.Weapon) katana: Weapon,
//         @inject(ClassTypes.ThrowableWeapon) shuriken: ThrowableWeapon
//     ) {
//         this._katana = katana;
//         this._shuriken = shuriken;
//     }

//     public fight() { return this._katana.hit(); };
//     public sneak() { return this._shuriken.throw(); };

// }


// import { Kernel } from "inversify";

// var kernel = new Kernel(); 
// // kernel.bind<Warrior>(ClassTypes.Warrior).to(Ninja);
// // kernel.bind<Weapon>(ClassTypes.Weapon).to(Katana);
// kernel.bind<ThrowableWeapon>(ClassTypes.LoginApplication).to(LoginApplication);

// export default kernel;


// var ninja = kernel.get<Warrior>(ClassTypes.Warrior);

// console.log(ninja.fight())
// console.log(ninja.sneak()) 