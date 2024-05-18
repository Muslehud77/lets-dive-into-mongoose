

import { Request, Response } from "express"
import { Student } from "./student.interface"
import { studentServices } from "./student.service"


const createStudent = async (req:Request,res:Response)=>{
  try{
      
    const student  = req.body as unknown as Student

    // will call service func to send this data
    const result = await studentServices.createStudentIntoDB(student)
    // send response

   res.status(200).json({
    success:true,
    message:"Student is Created Successfully",
    data:result
   })
  }
  catch(err){
    console.log(err);

    res.status(200)

  }



}


export const studentControllers = {
    createStudent
}