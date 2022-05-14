import query from './sql.js'
import db from '#pg'

async function checkPermission({staff_id, branch_id, permission_modules_id, permission_id}) {
    const [staff] = await db( query.CHECK_PERMISSION, staff_id, branch_id, permission_modules_id, permission_id)
    return staff
}

async function allow({staff_id, branch_id, permission_modules_id, permission_id}) {
    const [staff] = await db( query.ALLOW, staff_id, branch_id, permission_modules_id, permission_id)
    return staff
}

async function checkBranch({staff_id, branch_id }) {
    const [staff] = await db( query.CHECH_BRANCH, staff_id, branch_id )
    return staff
}

async function insertToBranch({staff_id, branch_id }) {
    const [staff] = await db( query.INSERT_TO_BRANCH, staff_id, branch_id )
    return staff
}

async function delete_permission({staff_id, branch_id, permission_modules_id, permission_id}) {
    const [allow] = await db( query.DELETE_PERMISSIONS, staff_id, branch_id, permission_modules_id, permission_id)
    return allow
}

async function getPermissions() {
    const permissions = await db( query.GET_ALL_PERMISSIONS)
    return permissions
}


// own permissions
async function getOwnPermissions(staff_id) {
    const permissions = await db( query.OWN_PWRMISSIONS, staff_id)

    return permissions
}


async function getStaff(staff_id) {
    const [staff] = await db( query.GET_STAFF, staff_id)
    return staff
}



async function getPermissionsModules() {
    const permissionsModules = await db( query.GET_PERMISSIONS_MODULES)
    return permissionsModules
}

async function addedPermission({staff_id, branch_id, permission_modules_id, permission_id}) {
    const [addedPermission] = await db( query.ADDED_PERMISSION, staff_id, branch_id, permission_modules_id, permission_id)
    return addedPermission
}


export default {
    getPermissionsModules,
    getOwnPermissions,
    delete_permission,
    addedPermission,
    checkPermission,
    getPermissions,
    insertToBranch,
    checkBranch,
    getStaff,
    allow
}