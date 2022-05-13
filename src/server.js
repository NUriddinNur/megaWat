import { ApolloServer } from 'apollo-server-express'
import { 
    ApolloServerPluginDrainHttpServer,
    ApolloServerPluginLandingPageGraphQLPlayground
} from 'apollo-server-core'
import express from 'express'
import http from "http"
import path from "path"

import './config/config.js'
import './utils/validation.js'
import schema from './modules/index.js'

import { graphqlUploadExpress } from 'graphql-upload'

async function startApolloServer() {
    const app = express()
    const httpServer = http.createServer(app)
    
    app.use(express.static(path.join(process.cwd(), 'uploads')))
    app.use(graphqlUploadExpress());

    const server = new ApolloServer({
        context: ({req, res}) => {
            return req
        },
        schema,
        introspection: true,
        plugins: [
            ApolloServerPluginDrainHttpServer({httpServer}),
            ApolloServerPluginLandingPageGraphQLPlayground
        ]
    })

    await server.start()
    server.applyMiddleware({ app })
    await new Promise(resolve => httpServer.listen({ port: process.env.PORT || 4000 }, resolve))
    console.log(`server reade at http://localhost:${4000}${server.graphqlPath}`);
}

startApolloServer()