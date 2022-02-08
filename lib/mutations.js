import { ConnectBD } from "./db.js";

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
    }
} 