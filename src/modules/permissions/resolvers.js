import checkToken from '../../utils/checkToken.js'
import model from './model.js'


export default {
    Query : {
        permissions: async function (_, __, {headers}){
            checkToken(headers.token, headers['user-agent'])
            return await model.getPermissions()
        },

        permissionsModules: async function (_, __, {headers}){
            checkToken(headers.token, headers['user-agent'])
            return await model.getPermissionsModules()
        },

        ownPermissions: async function(_, __, {headers}) {
            const { staff_id } = checkToken(headers.token, headers['user-agent'])
            const staff = await model.getStaff(staff_id)
            return await model.getOwnPermissions(staff.staff_name)
        }

    },

    Mutation: {
        addPermission: async function (_, args, {headers}){
            const { staff_id } = checkToken(headers.token, headers['user-agent'])
            const perrmission = await model.checkPermission({staff_id: staff_id, branch_id: args.branch_id, permission_modules_id: args.permission_modules_id, permission_id: args.permission_id})
            let check_db = await model.checkPermission({staff_id: args.staff_id, branch_id: args.branch_id, permission_modules_id: args.permission_modules_id, permission_id: args.permission_id})

            if(!perrmission) {
                return {
                    status: 404,
                    message: 'nott allowed',
                    data: null
                }
            }
            else if(check_db) {
                return {
                    status: 404,
                    message: 'The allowed',
                    data: null
                }
            }

            const cheCkBranch = await model.checkBranch(args)

            if(!cheCkBranch) {
                // insert staff to braches taffs
                await model.insertToBranch(args)
            }
            
            const allow = await model.allow({staff_id: args.staff_id, branch_id: args.branch_id, permission_modules_id: args.permission_modules_id, permission_id: args.permission_id})
            const permissionData = await model.addedPermission(allow)
            permissionData.staff_permissions_id = allow.staff_permissions_id

            
            return {
                status: 200,
                message: "The employee was allowed",
                data: permissionData
            }
        },

        deletePermission: async function (_, args, {headers}) {
            const { staff_id } = checkToken(headers.token, headers['user-agent'])
            const perrmission = await model.checkPermission({staff_id: staff_id, branch_id: args.branch_id, permission_modules_id: args.permission_modules_id, permission_id: args.permission_id})
            let check_db = await model.checkPermission({staff_id: args.staff_id, branch_id: args.branch_id, permission_modules_id: args.permission_modules_id, permission_id: args.permission_id})

            if(!perrmission) {
                return {
                    status: 404,
                    message: 'Nott allowed',
                    data: null
                }
            }
            else if(!check_db) {
                return {
                    status: 404,
                    message: 'This feature is not provided',
                    data: null
                }
            }
            
            const deletedPermission = await model.delete_permission({staff_id: args.staff_id, branch_id: args.branch_id, permission_modules_id: args.permission_modules_id, permission_id: args.permission_id})
            const permissionData = await model.addedPermission(deletedPermission)
            permissionData.staff_permissions_id = permissionData.staff_permissions_id

            return {
                status: 200,
                message: "Deleted permission",
                data: permissionData
            }
        }
    },

    PermissionData: {
        staff_permissions_id: global => global.staff_permissions_id,
        staff_name: global => global.staff_name,
        branch_name: global => global.branch_name,
        permission_modules_name: global => global.permission_modules_name,
        permission_name: global => global.permission_name
    },

    Permission: {
        permission_id: global => global.permission_id,
        permission_name: global => global.permission_name
    },

    PermissionModules: {
        permission_modules_id: global => global.permission_modules_id,
        permission_modules_name: global => global.permission_modules_name
    },

    Permissions: {
        branch_name: global => global.branch_name,
        permission_modules_name: global => global.permission_modules_name,
        permissions: global => global.permissions
    }
}   