import query from './sql.js'
import db from '#pg'


async function getCars() {
    return await db(query.GET_CARS)
}

async function getCar({car_id}) {
    const [car] = await db(query.GET_CAR, car_id)
    return car
}

async function checkPermission({staff_id, branch_id, permission_modules_id, permission_id}) {
    const [staff] = await db( query.CHECK_PERMISSION, staff_id, branch_id, permission_modules_id, permission_id)
    return staff
}

async function getBrand(brand_id) {
    const [brand] = await db(query.GET_BRAND, brand_id)
    return brand
}

async function getBranch(branch_id) {
    const [branch] = await db(query.GET_BRANCH, branch_id)
    return branch
}

async function checkCarModel(model, branch) {
    const [carModel] = await db(query.GET_CAR_MODEL, model, branch)
    return carModel
}

// insert car to db
async function insertCar({ brand_id, branch_id, model: car_model, color: car_color, car_img, price }) {
    const [newCar] = await db( query.INSERT_CAR, car_model, car_color, car_img, price,  brand_id, branch_id)
    return newCar
}


async function changeCar({ car_id, color, model, price }) {
    console.log(car_id);
    const [changedCar] = await db(query.CHANGE_CAR, car_id, color, model, price)
    return changedCar
}




async function deleteCar({ car_id }) {
    const [deletedbranch] = await db( query.DELETE_CAR, car_id )
    return deletedbranch
}








export default {
    checkPermission,
    checkCarModel,
    getBranch,
    insertCar,
    deleteCar,
    changeCar,
    getBrand,
    getCars, 
    getCar,
}





