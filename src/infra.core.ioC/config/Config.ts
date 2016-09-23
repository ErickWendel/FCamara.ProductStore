import { Kernel } from "inversify";
import LoginApplication from '../../application/LoginApplication';
import { ProductApplication } from '../../application/ProductApplication';

export function KernelConfig (): inversify.interfaces.Kernel  {
        var kernel = new Kernel();
        kernel.bind<LoginApplication>("LoginApplication").to(LoginApplication);
        kernel.bind<ProductApplication>("ProductApplication").to(ProductApplication);
        return kernel;
    
}