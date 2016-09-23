import { ProductApplication as IProductApplication  } from '../domain/contracts/application/ProductApplication';
import Product from '../domain/entities/product';

import "reflect-metadata";
import { injectable, inject, } from "inversify";

@injectable()
export class ProductApplication implements ProductApplication {

    private productRepository: string;
    
    list(): Product[] {
        return null;
    }
}