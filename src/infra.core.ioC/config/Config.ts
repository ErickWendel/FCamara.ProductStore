import { Kernel } from "inversify";
import LoginApplication from '../../application/LoginApplication';
import { ProductApplication } from '../../application/ProductApplication';
import { IProductApplication } from '../../domain/contracts/application/IProductApplication';
import { ILoginApplication } from '../../domain/contracts/application/ILoginApplication';

import { ProductRepository } from '../../infra.dataAccess/repository/ProductRepository';
import { IProductRepository } from '../../domain/contracts/repository/IProductRepository';

export function KernelConfig(): inversify.interfaces.Kernel {
        var kernel = new Kernel();
        kernel.bind<ILoginApplication>("ILoginApplication").to(LoginApplication);
        kernel.bind<IProductApplication>("IProductApplication").to(ProductApplication);
        kernel.bind<IProductRepository>("IProductRepository").to(ProductRepository);

        return kernel;

}