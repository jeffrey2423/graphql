import { ConnectBD } from "./db.js";
import {ObjectId} from 'mongodb'

let connection
try {
    (async() => {
        connection = await ConnectBD()
    })();
    
} catch (error) {
    console.error(error)
}

export const mutations = {
    createCourse: async(root, args) =>{
        const defaults = {
            teacher: '',
            topic: ''
        }
        const newCourse = Object.assign(defaults, args.input)
        let course
        try {
            course = await connection.collection('courses').insertOne(newCourse)
            newCourse._id = course.insertedId;
        } catch (error) {
            console.error(error)
        }
        return newCourse;
    },
    createStudent: async(root, args) =>{

        let newStudent 
        try {
            newStudent = await connection.collection('courses').insertOne(args.input)
            args.input._id = newStudent.insertedId;
        } catch (error) {
            console.error(error)
        }
        return args.input;
    },
    editCourse: async(root, {_id, input}) =>{

        let newStudent 
        try {
            newStudent = await connection.collection('courses').updateOne({
                _id: ObjectId(_id),
                set
            })
            args.input._id = newStudent.insertedId;
        } catch (error) {
            console.error(error)
        }
        return args.input;
    }


} 