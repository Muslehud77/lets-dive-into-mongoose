import { TStudent } from './student.interface';
import { Student } from './student.model';

const createStudentIntoDB = async (studentData: TStudent) => {
  // const result = await StudentModel.create(student);

  const student = new Student(studentData); // create an instance


  if(await student.isUserExists(studentData.id)){
    throw new Error("User already exists!")
  }

  const result = await student.save(); // build in instance method

  return result;
};

const getStudentByIdFromDB = async (id: string) => {
  const studentId = { _id: id };
  const result = await Student.findById(studentId);
  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

export const studentServices = {
  createStudentIntoDB,
  getStudentByIdFromDB,
  getAllStudentsFromDB,
};
