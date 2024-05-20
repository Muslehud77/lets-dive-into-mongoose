import { Schema, model } from 'mongoose';
import validator from 'validator';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentMethods,
  StudentModel,
  TUserName,
} from './student.interface';

// Define a constant for the optional string type
const stringTypeOptional = { type: String, trim: true };

const nameValidator = (value: string): boolean => {
  const toLowercase = value.toLowerCase();
  const capitalizeString =
    toLowercase.charAt(0).toUpperCase() + toLowercase.slice(1);
  return value === capitalizeString;
};

// Define the schema for the user name
const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
    // validate: {
    //   validator: function (value: string) {
    //     const toLowercase = value.toLowerCase();
    //     const capitalizeString =
    //       toLowercase.charAt(0).toUpperCase() + toLowercase.slice(1);
    //     return value === capitalizeString;
    //   },
    //   message: '{VALUE} is not capitalized!',
    // },
  },
  middleName: stringTypeOptional,
  lastName: {
    type: String,
    required: [true, 'Last Name is required'],
    trim: true,
    // validate: {
    //   validator: (value: string) => validator.isAlpha(value),
    //   message: '{VALUE} is not valid',
    // },
  },
});

// Define the schema for the guardian
const guardianSchema = new Schema<TGuardian>({
  name: {
    type: String,
    required: [true, 'Guardian Name is required'],
    minlength: [5, 'Need at least 5 characters'],

    trim: true,
  },
  occupation: {
    type: String,
    required: [true, 'Guardian Occupation is required'],
    trim: true,
  },
  contactNumber: {
    type: String,
    required: [true, 'Guardian Contact Number is required'],
    trim: true,
  },
});

// Define the schema for the local guardian
const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, 'Guardian Name is required'],
    minlength: [5, 'Need at least 5 characters'],

    trim: true,
  },
  occupation: {
    type: String,
    required: [true, 'Local Guardian Occupation is required'],
    trim: true,
  },
  contactNumber: {
    type: String,
    required: [true, 'Local Guardian Contact Number is required'],
    trim: true,
  },
  address: {
    type: String,
    required: [true, 'Local Guardian Address is required'],
    trim: true,
  },
});

// Define the schema for the student
const studentSchema = new Schema<TStudent, StudentModel, StudentMethods>({
  id: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  name: { type: userNameSchema, required: [true, 'Student Name is required'] },
  gender: {
    enum: {
      values: ['male', 'female', 'others'],
      message:
        "{VALUE} is not valid, The gender field can only be 'male', 'female' or 'other'",
    },
    type: String,
    required: [true, 'Gender is required'],
  },
  dateOfBirth: stringTypeOptional,
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: '{VALUE} is not a valid email',
    },
  },
  contactNumber: {
    type: String,
    required: [true, 'Contact Number is required'],
    trim: true,
  },
  emergencyContactNo: {
    type: String,
    required: [true, 'Emergency Contact Number is required'],
    trim: true,
  },
  bloodGroup: {
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    ...stringTypeOptional,
  },
  presentAddress: {
    type: String,
    required: [true, 'Present Address is required'],
    trim: true,
  },
  permanentAddress: {
    type: String,
    required: [true, 'Permanent Address is required'],
    trim: true,
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

studentSchema.methods.isUserExists = async function(id:string){
  const existingUser = await Student.findOne({id})
  return existingUser
}

// Create the student model
export const Student = model<TStudent,StudentModel>('Student', studentSchema);
