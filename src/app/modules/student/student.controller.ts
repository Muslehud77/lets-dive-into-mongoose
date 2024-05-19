import { Request, Response } from 'express';
import { Student } from './student.interface';
import { studentServices } from './student.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    const student = req.body.student as unknown as Student;

    // will call service func to send this data
    const result = await studentServices.createStudentIntoDB(student);
    // send response

    res.status(200).json({
      success: true,
      message: 'Student is Created Successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);

    res.status(200);
  }
};

const getStudentByID = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as string;
    const result = await studentServices.getStudentByIdFromDB(id);
    res.status(200).json({
      success: true,
      message: 'Query Successful',
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.status(400);
  }
};

const getAllStudent = async (req: Request, res: Response) => {
  try {
    const result = await studentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: 'Query Successful',
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.status(400);
  }
};

export const studentControllers = {
  createStudent,
  getStudentByID,
  getAllStudent,
};
