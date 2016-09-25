import * as async from 'bluebird';
import "reflect-metadata";
import { injectable, inject, } from "inversify";
import { IProductRepository } from '../domain/contracts/repository/IProductRepository';
import { IProductApplication } from '../domain/contracts/application/IProductApplication';
import Product from '../domain/entities/product';


@injectable()
export default class ProductApplication implements IProductApplication {

    private _productRepository: IProductRepository;
    constructor(@inject("IProductRepository") productReposity: IProductRepository) {
        this._productRepository = productReposity;
    }
    list(): async<Product[]> {

        return this._productRepository
                    .getAll();
                    
    }
    insertMany(): async<Object> {
        return this._productRepository.mockData(this.generateData());
    }

    private generateData(): Product[] {
        var products: Product[] = new Array<Product>();
        for (var i = 0; i < 30; i++) {
            let product: Product = <Product>{
                id: i,
                description: `This product is ${i}`,
                name: `Product ${i}`,
                price: Math.round(100 * i)
            };
            products.push(product);
        }
        return products;
    }
}
Object.seal(ProductApplication);
