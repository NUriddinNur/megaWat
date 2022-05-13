import { makeExecutableSchema } from '@graphql-tools/schema'

import userModule from './staffs/index.js'
import authModule from './auth/index.js'
import brandModule from './brand/index.js'
import PermissionsModule from './permissions/index.js'
import BranchModule from './branch/index.js'
// import CarModule from './car/index.js'


export default makeExecutableSchema({
    typeDefs: [
        PermissionsModule.typeDefs,
        userModule.typeDefs,
        authModule.typeDefs,
        brandModule.typeDefs,
        BranchModule.typeDefs,
        // CarModule.typeDefs
    ],

    resolvers: [
        PermissionsModule.resolvers,
        userModule.resolvers,
        authModule.resolvers,
        brandModule.resolvers,
        BranchModule.resolvers,
        // CarModule.resolvers
    ]
})