import { Schema, model } from 'mongoose';
import { Guardian, LocalGuardian, Student, UserName } from './student.interface';



const stringTypeRequired = {type:String,required:true}
const stringTypeOptional = {type:String}


const userNameSchema = new Schema<UserName>({
    firstName: stringTypeRequired,
    middleName: stringTypeOptional,
    lastName: stringTypeRequired,
  })

const guardianSchema = new Schema<Guardian>({
  name: stringTypeRequired,
  occupation: stringTypeRequired,
  contactNumber: stringTypeRequired,
});

const localGuardianSchema = new Schema<LocalGuardian>({
  name: stringTypeRequired,
  occupation: stringTypeRequired,
  contactNumber: stringTypeRequired,
  address: stringTypeRequired,
});

const studentSchema = new Schema<Student>({
  id: stringTypeOptional,
  name: userNameSchema,
  gender: {enum:['male', 'female'],...stringTypeRequired},
  dateOfBirth: stringTypeOptional,
  email: stringTypeRequired,
  contactNumber: stringTypeRequired,
  emergencyContactNo: stringTypeRequired,
  bloodGroup:{ enum:['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],...stringTypeRequired},
  presentAddress: stringTypeRequired,
  permanentAddress: stringTypeRequired,
  guardian: {
    father: guardianSchema,
    mother: guardianSchema,
  },
  localGuardian: localGuardianSchema,
  profileImg: stringTypeOptional,
  isActive: {enum:['active', 'inactive'],...stringTypeRequired},
});



export const StudentModel = model<Student>('Student',studentSchema)