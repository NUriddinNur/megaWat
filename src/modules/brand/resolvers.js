import { ValidationError } from "apollo-server-express";
import model from './model.js'


export default {
    Mutation: {
        addBrand: async function (_, args ){
            const brand = await model.addBrand(args)
            
            return {
                status: 200,
                message: "Brand added!",
                data: brand,
            }
        }
    },

    Query: {
        getBrands: async function () {
            return await model.getBrands()
        }
    },

    Brand: {
        brand_id: global => global.brand_id,
        brand_name: global => global.brand_name,
    },
}