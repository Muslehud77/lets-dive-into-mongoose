import { Request, Response } from 'express';
import { Student } from './student.interface';
import { studentServices } from './student.service';
import Joi from 'joi'

const createStudent = async (req: Request, res: Response) => {
  try {
      
    //creating a schema validation using joi

    const JoiValidationSchema = Joi.object({
      id: Joi.string().trim(),
      name: Joi.object({
        firstName: Joi.string().min(5).required(),
        middleName: Joi.string().allow('').trim(),
        lastName: Joi.string().min(5).required(),
      }),
      gender: Joi.string().valid('male', 'female', 'others').required(),
      dateOfBirth: Joi.string().allow('').trim(),
      email: Joi.string().email().required().trim(),
      contactNumber: Joi.string().required().trim(),
      emergencyContactNo: Joi.string().required().trim(),
      bloodGroup: Joi.string()
        .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
        .allow('')
        .trim(),
      presentAddress: Joi.string().required().trim(),
      permanentAddress: Joi.string().required().trim(),
      guardian: Joi.object({
        father: Joi.object({
          name: Joi.string().min(5).required().trim(),
          occupation: Joi.string().required().trim(),
          contactNumber: Joi.string().required().trim(),
        }),
        mother: Joi.object({
          name: Joi.string().min(5).required().trim(),
          occupation: Joi.string().required().trim(),
          contactNumber: Joi.string().required().trim(),
        }),
      }).required(),
      localGuardian: Joi.object({
        name: Joi.string().min(5).required().trim(),
        occupation: Joi.string().required().trim(),
        contactNumber: Joi.string().required().trim(),
        address: Joi.string().required().trim(),
      }).required(),
      profileImg: Joi.string().allow('').trim(),
      isActive: Joi.string()
        .valid('active', 'inactive')
        .default('active')
        .trim(),
    });





    const student = await JoiValidationSchema.validateAsync(req.body.student)

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

    res.status(500).json({
      success: false,
      message: 'Could not complete the request',
      data: err,
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
