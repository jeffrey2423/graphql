import * as dotenv from 'dotenv'
import express from 'express'
import { makeExecutableSchema } from 'graphql-tools'
import { graphqlHTTP } from 'express-graphql'
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { resolvers } from './lib/resolvers.js'

dotenv.config();

const app = express()
const PORT = process.env.PORT || 3000
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const typeDefs = readFileSync(
    join(
        __dirname,
        'lib',
        'schema.graphql'
    ),
    'utf-8'
)

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

app.use('/api', graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true
}))

app.listen(PORT, () => {
    console.log(`Server is listen at http://localhost:${PORT}`)
})
