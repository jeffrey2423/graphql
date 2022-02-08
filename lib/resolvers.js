import { ConnectBD } from "./db.js";
import {ObjectID} from 'mongodb'
import {mutations} from './mutations.js'

let connection
try {
    (async() => {
        connection = await ConnectBD()
    })();
    
} catch (error) {
    console.error(error)
}

export const resolvers = {
    Query: {
        getCourses: async() => {
            let courses = [];          
            try {          
                courses = connection.collection('courses').find().toArray()
            } catch (error) {
                console.error(error)
            }
            return courses;
        },
        getCourse: (root, args) =>{
            let course = {}
            try {          
            course = connection.collection('courses').findOne({
                _id: ObjectID(args.id)
            })
            } catch (error) {
                console.error(error)
            }     
            return course
        }
    },
    Mutation: mutations      

}
