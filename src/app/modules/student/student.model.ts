import { Schema, model, connect } from 'mongoose';
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
  gender: ['male', 'female'],
  dateOfBirth: stringTypeOptional,
  email: stringTypeRequired,
  contactNumber: stringTypeRequired,
  emergencyContactNo: stringTypeRequired,
  bloodGroup: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  presentAddress: stringTypeRequired,
  permanentAddress: stringTypeRequired,
  guardian: {
    father: guardianSchema,
    mother: guardianSchema,
  },
  localGuardian: localGuardianSchema,
  profileImg: stringTypeOptional,
  isActive: ['active', 'inactive'],
});



const Student = model<Student>('Student',studentSchema)