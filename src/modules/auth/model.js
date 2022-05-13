import query from './sql.js'
import db from '#pg'

async function registerStaffs({staff_name, password, birth_date, gender}) {
    const [staff] = await db( query.REGISTER_STAFF, staff_name, password, birth_date, gender)
    return staff
}

async function loginStaff({ staff_name, password }) {
    const [staff] = await db( query.LOG_IN, staff_name, password)
    return staff
}


export default {
    registerStaffs,
    loginStaff
}