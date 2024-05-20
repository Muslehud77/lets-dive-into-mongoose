import { Request, Response } from 'express';

import { studentServices } from './student.service';
import { JoiStudentValidationSchema } from './student.joiValidation';
import { TStudent } from './student.interface';
import zodStudentValidationSchema from './student.zodValidation';

const createStudent = async (req: Request, res: Response) => {
  try {
    //* data validation using Joi
    // const { value: student } = await JoiStudentValidationSchema.validateAsync(
    //   req.body.student,
    // );

    //* data validation using Zod
    const student = await zodStudentValidationSchema.parseAsync(
      req.body.student,
    );

    // will call service func to send this data
    const result = await studentServices.createStudentIntoDB(student);
    // send response

    res.status(200).json({
      success: true,
      message: 'Student is Created Successfully',
      data: result,
    });
  } catch (err : any) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: 'Could not complete the request',
      data: err.message,
    });
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
    res.status(500).json({
      success: false,
      message: 'Could not complete the request',
      data: err,
    });
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
    res.status(500).json({
      success: false,
      message: 'Could not complete the request',
      data: err,
    });
  }
};

export const studentControllers = {
  createStudent,
  getStudentByID,
  getAllStudent,
};
