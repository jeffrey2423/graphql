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

export const querys = {
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
            _id: ObjectId(args.id)
        })
        } catch (error) {
            console.error(error)
        }     
        return course
    },
    getEstudents: async() => {
        let students = [];          
        try {          
            students = connection.collection('students').find().toArray()
        } catch (error) {
            console.error(error)
        }
        return students;
    },
    getEstudent: (root, args) =>{
        let students = {}
        try {          
        students = connection.collection('students').findOne({
            _id: ObjectId(args.id)
        })
        } catch (error) {
            console.error(error)
        }     
        return students
    }
}