import { ProductService } from '../domain/contracts/services/productService';
import Product from '../domain/entities/product';
export class ProductApplication implements ProductService {

    private productRepository: string;
    
    List(): Product[] {
        return null;
    }
}