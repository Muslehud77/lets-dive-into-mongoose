import { Student } from "./student.interface";
import { StudentModel } from "./student.model";


const createStudentIntoDB = async (student:Student)=>{
   const result =  await StudentModel.create(student)
   return result
}

const getStudentByIdFromDB = async(id:string)=>{
    const studentId = {_id: id}
    const result = await StudentModel.findById(studentId)
    return result
}

const getAllStudentsFromDB = async()=>{
    const result = await StudentModel.find()
    return result
}


export const studentServices = {
  createStudentIntoDB,
  getStudentByIdFromDB,
  getAllStudentsFromDB,
};