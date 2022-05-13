import query from './sql.js'
import db from '#pg'

async function addBrand({brand_name}) {
    const [brand] = await db( query.ADD_BRAND, brand_name)
    return brand
}

async function getBrands() {
    return await db(
        query.GET_BRANDS,
    )
}


export default {
    addBrand,
    getBrands
}