import * as async from 'bluebird';
import "reflect-metadata";
import { injectable, inject, } from "inversify";
import { IProductRepository } from '../domain/contracts/repository/IProductRepository';
import { IProductApplication } from '../domain/contracts/application/IProductApplication';
import Product from '../domain/entities/product';
import ProductDto from '../domain/entities/dto/ProductDto';


@injectable()
export default class ProductApplication implements IProductApplication {

    private _productRepository: IProductRepository;
    constructor( @inject("IProductRepository") productReposity: IProductRepository) {
        this._productRepository = productReposity;
    }
    list(skip: number, limit: number): async<ProductDto> {
        if (skip === 0) skip += 1;

        return this._productRepository
            .getAll(skip, limit)
            .then((result: any) => {
                const values = result.docs;
                let dto = new ProductDto();
                values.map(i => dto.products.push(i));
                dto.count = result.total;
                return dto;
            });

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
