import Constants from '../../infra.core/config/constants/constants';
import DataAccess from '../DataAccess';
import * as MongoosePaginate from 'mongoose-paginate';
import * as Mongoose from 'mongoose';
const mongoose = DataAccess.mongooseInstance;
const mongooseCon = DataAccess.mongooseConnection;

export default class ProductSchema {
    static getSchema () {
        let options: Mongoose.Schema = mongoose.Schema({
            id: Number,
            name: String,
            description: String,
            price: Number
        });
        options.plugin(MongoosePaginate);
        return mongooseCon.model(Constants.MONGOOSE_MODEL, options);
    }
}

Object.seal(ProductSchema);
