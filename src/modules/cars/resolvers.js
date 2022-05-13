import checkToken from '../../utils/checkToken.js'
import model from './model.js'


export default {
    Mutation: {
        addBranch: async (_, args, {headers}) => {
            const { staff_id } = checkToken(headers.token, headers['user-agent'])
            const permission = await model.checkPermission({staff_id, permission_modules_id: '8c17d522-1de4-44cb-a5c0-549e4ccdb654', permission_id: 'ddc7dc63-7d14-4e21-83de-7fcbede6a6a8'})

            if(!permission) {
                return {
                    status: 404,
                    message: 'nott allowed',
                    data: null
                }
            }
            const newBranchData = await model.insertBranch(args)
            return {
                status: 200,
                message: 'Branch added!',
                data: newBranchData
            }
        },

        changeBranch: async (_, args, {headers}) => {
            const { staff_id } = checkToken(headers.token, headers['user-agent'])
            const permission = await model.checkPermission({staff_id, permission_modules_id: '8c17d522-1de4-44cb-a5c0-549e4ccdb654', permission_id: '9303a0d1-3c16-48ef-aa36-a030a1e933df'})
            if (
                (args.branch_name && !args.branch_name.trim()) ||
                (args.address && !args.address.trim())
            ) {
                throw new UserInputError("The username or contact cannot be empty!")
            }

            if(!permission) {
                return {
                    status: 404,
                    message: 'nott allowed',
                    data: null
                }
            }
            const branch = await model.getBranch(args)

            if (!branch) {
                return {
                    status: 404,
                    message: 'Branch not found',
                    data: null
                }
            }
            const newBranchData = await model.changeBranch(args)

            return {
                status: 200,
                message: 'Branch added!',
                data: newBranchData
            }
        },

        deleteBranch: async (_, args, {headers}) => {
            const { staff_id } = checkToken(headers.token, headers['user-agent'])
            const permission = await model.checkPermission({staff_id, permission_modules_id: '8c17d522-1de4-44cb-a5c0-549e4ccdb654', permission_id: '76975cfe-cc03-46c6-8ea7-a91e473e24c2'})


            if(!permission) {
                return {
                    status: 404,
                    message: 'nott allowed',
                    data: null
                }
            }

            const branch = await model.getBranch(args)
            if (!branch) {
                return {
                    status: 404,
                    message: 'Branch not found',
                    data: null
                }
            }

            const deletedBranch = await model.deleteBranch(args)
            return {
                status: 200,
                message: 'Branch deleted!',
                data: deletedBranch
            }
        },

    },

    Branch: {
        branch_id: global => global.branch_id,
        branch_name: global => global.branch_name,
        address: global => global.address,
        branch_created_at: global => String(global.branch_created_at)
    }
}
