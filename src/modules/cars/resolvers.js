import { UserInputError } from 'apollo-server-express'
import checkToken from '../../utils/checkToken.js'
import model from './model.js'


import fs from 'fs'
import path from 'path'
import {GraphQLUpload} from 'graphql-upload'
import { finished } from 'stream'


export default {
    Upload: GraphQLUpload,

    Query: {
        getCars: async (_, __, {headers}) => {
            checkToken(headers.token, headers['user-agent'])
            return await model.getCars()
        }
    },

    


    Mutation: {
        addCar: async (_, args, {headers}) => {
            const { staff_id } = checkToken(headers.token, headers['user-agent'])
            const permission = await model.checkPermission({staff_id, branch_id: args.branch_id, permission_modules_id: '59684882-8d5f-4e92-a692-3e43864dc7f6', permission_id: 'ddc7dc63-7d14-4e21-83de-7fcbede6a6a8'})
            let { createReadStream, filename, mimetype } = await args.file
            const stream = createReadStream()


            if (
                (!args.color.trim()) ||
                (!args.model.trim())
            ) {
                throw new UserInputError("The color or model cannot be empty!")
            }

            if(!permission) {
                return {
                    status: 404,
                    message: 'nott allowed',
                    data: null
                }
            }

            const brand = await model.getBrand(args.brand_id)
            const checkCarModel = await model.checkCarModel(args.model, args.branch_id)

            if(checkCarModel) {
                return {
                    status: 404,
                    message: 'The model already exists!',
                    data: null
                }
            }
            if(!brand) {
                return {
                    status: 404,
                    message: 'Brand not found',
                    data: null
                }
            }

            if(mimetype.split("/")[0] != "image"){
                return {
                  status: 400,
                  message: "Invalid file input!",
                  data: null
                }
            }

            filename = Date.now() + filename
            args.car_img = filename

            const branch = await model.getBranch(args.branch_id)
            const newCar = await model.insertCar(args)
            newCar.brand = brand.brand_name
            newCar.branch = branch.branch_name

            console.log(newCar);

            const out = fs.createWriteStream(path.join(process.cwd(), 'uploads', 'images', filename));
            stream.pipe(out);
            // finished(out);

            return {
                status: 200,
                message: "Car added!",
                data: newCar
            }

        },

        changeCar: async (_, args, {headers}) => {
            const { staff_id } = checkToken(headers.token, headers['user-agent'])
            const car = await model.getCar(args)

            if(!car) {
                return {
                    status: 404,
                    message: 'Car not found',
                    data: null
                }
            }
            const permission = await model.checkPermission({staff_id, branch_id: car.branch_id, permission_modules_id: '59684882-8d5f-4e92-a692-3e43864dc7f6', permission_id: '9303a0d1-3c16-48ef-aa36-a030a1e933df'})
            
            if (
                ( args.color && !args.color.trim()) || args.color === "" ||
                ( args.model && !args.model.trim()) || args.model === ""
            ) {
                throw new UserInputError("The color or model cannot be empty!")
            }
            if(!permission) {
                return {
                    status: 404,
                    message: 'nott allowed',
                    data: null
                }
            }
            
            const changedCar = await model.changeCar(args)
            const branch = await model.getBranch(changedCar.branch_id)
            const brand = await model.getBrand(changedCar.brand_id)
            changedCar.branch = branch.branch_name
            changedCar.brand = brand.brand_name

            return {
                status: 200,
                message: 'Car changed!',
                data: changedCar
            }
        },

        deleteCar: async (_, args, {headers}) => {
            const { staff_id } = checkToken(headers.token, headers['user-agent'])
            const car = await model.getCar(args)

            if(!car) {
                return {
                    status: 404,
                    message: 'Car not found',
                    data: null
                }
            }
            const permission = await model.checkPermission({staff_id, branch_id: car.branch_id, permission_modules_id: '59684882-8d5f-4e92-a692-3e43864dc7f6', permission_id: '76975cfe-cc03-46c6-8ea7-a91e473e24c2'})

            if(!permission) {
                return {
                    status: 404,
                    message: 'nott allowed',
                    data: null
                }
            }
            const deletedCar = await model.deleteCar(args)

            return {
                status: 200,
                message: 'Car deleted!',
                data: deletedCar
            }
        },

    },

    Car: {
        car_id: global => global.car_id,
        car_model: global => global.car_model,
        car_color: global => global.car_color,
        car_img: global => global.car_img,
        price: global => global.price,
        car_added_at: global => global.car_added_at,
        brand: global => global.brand,
        branch: global => global.branch
    },
}
