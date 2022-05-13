import query from './sql.js'
import db from '#pg'

async function getStaffs() {
    return await db(
        query.GET_STAFFS,
    )
}

export default {
    getStaffs
}