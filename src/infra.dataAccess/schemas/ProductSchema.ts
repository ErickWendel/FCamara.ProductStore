import Constants from '../../infra.core/config/constants/constants';
import DataAccess from '../DataAccess';
const mongoose = DataAccess.mongooseInstance;
const mongooseCon = DataAccess.mongooseConnection;

export class ProductSchema {
    static getSchema () {
        const options = mongoose.Schema({
            id: Number,
            name: String,
            description: String,
            price: Number
        });
        return mongooseCon.model(Constants.MONGOOSE_MODEL, options);
    }
}