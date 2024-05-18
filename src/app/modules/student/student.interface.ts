import { Schema, model, connect } from 'mongoose';

type Parent = {
  name: string;
  occupation: string;
  contactNumber: string;
};

export type Student = {
  id: string;
  name: {
    firstName: string;
    middleName: string;
    lastName: string;
  };
  gender: 'male' | 'female';
  dateOfBirth: string;
  email: string;
  contactNumber: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: {
    father: Parent;
    mother: Parent;
  };
};
