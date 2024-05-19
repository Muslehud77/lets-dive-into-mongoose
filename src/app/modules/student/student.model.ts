import { Schema, model } from 'mongoose';
import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from './student.interface';

// Define a constant for the optional string type
const stringTypeOptional = { type: String };

// Define the schema for the user name
const userNameSchema = new Schema<UserName>({
  firstName: { type: String, required: [true, 'First Name is required'] },
  middleName: stringTypeOptional,
  lastName: { type: String, required: [true, 'Last Name is required'] },
});

// Define the schema for the guardian
const guardianSchema = new Schema<Guardian>({
  name: { type: String, required: [true, 'Guardian Name is required'] },
  occupation: {
    type: String,
    required: [true, 'Guardian Occupation is required'],
  },
  contactNumber: {
    type: String,
    required: [true, 'Guardian Contact Number is required'],
  },
});

// Define the schema for the local guardian
const localGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String, required: [true, 'Local Guardian Name is required'] },
  occupation: {
    type: String,
    required: [true, 'Local Guardian Occupation is required'],
  },
  contactNumber: {
    type: String,
    required: [true, 'Local Guardian Contact Number is required'],
  },
  address: {
    type: String,
    required: [true, 'Local Guardian Address is required'],
  },
});

// Define the schema for the student
const studentSchema = new Schema<Student>({
  id: stringTypeOptional,
  name: { type: userNameSchema, required: [true, 'Student Name is required'] },
  gender: {
    enum: ['male', 'female'],
    ...{ type: String, required: [true, 'Gender is required'] },
  },
  dateOfBirth: stringTypeOptional,
  email: { type: String, required: [true, 'Email is required'] },
  contactNumber: {
    type: String,
    required: [true, 'Contact Number is required'],
  },
  emergencyContactNo: {
    type: String,
    required: [true, 'Emergency Contact Number is required'],
  },
  bloodGroup: {
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    ...stringTypeOptional,
  },
  presentAddress: {
    type: String,
    required: [true, 'Present Address is required'],
  },
  permanentAddress: {
    type: String,
    required: [true, 'Permanent Address is required'],
  },
  guardian: {
    father: {
      type: guardianSchema,
      required: [true, 'Father Guardian Details are required'],
    },
    mother: {
      type: guardianSchema,
      required: [true, 'Mother Guardian Details are required'],
    },
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, 'Local Guardian Details are required'],
  },
  profileImg: stringTypeOptional,
  isActive: {
    enum: ['active', 'inactive'],
    ...stringTypeOptional,
    default: 'active',
  },
});

// Create the student model
export const StudentModel = model<Student>('Student', studentSchema);
