import query from './sql.js'
import db from '#pg'

async function checkPermission({staff_id, permission_modules_id, permission_id}) {
    const [staff] = await db( query.CHECK_PERMISSION, staff_id, permission_modules_id, permission_id)
    return staff
}

async function insertBranch({ branch_name, address }) {
    const [branche] = await db( query.INSERT_BRANCH, branch_name, address )
    return branche
}

async function changeBranch({ branch_id, branch_name, address }) {
    const [changedBranch] = await db(query.CHANGE_BRANCH, branch_id, branch_name, address)
    return changedBranch
}

async function getBranch({ branch_id }) {
    const [branch] = await db( query.GET_BRANCH, branch_id )
    return branch
}

async function deleteBranch({ branch_id }) {
    const [deletedbranch] = await db( query.DELETE_BRANCH, branch_id )
    return deletedbranch
}








export default {
    checkPermission,
    changeBranch,
    insertBranch,
    deleteBranch,
    getBranch
}