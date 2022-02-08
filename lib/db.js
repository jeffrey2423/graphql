import {MongoClient} from 'mongodb'

const mongoUrl = 'mongodb://localhost/curso_graphql'
let connection

export async function ConnectBD(){
    if(connection) return connection

    let client

    try {
        client = await MongoClient.connect(mongoUrl,{
            useNewUrlParser: true
        })
        connection = client.db('curso_graphql')
    } catch (error) {
        console.error(error)
    }

    return connection
}
