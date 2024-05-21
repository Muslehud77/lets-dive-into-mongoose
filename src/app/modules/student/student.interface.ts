import { Model } from 'mongoose';

export type TGuardian = {
  name: string;
  occupation: string;
  contactNumber: string;
};

export interface TLocalGuardian extends TGuardian {
  address: string;
}

export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TStudent = {
  id: string;
  password:string;
  name: TUserName;
  gender: 'male' | 'female' | 'others';
  dateOfBirth?: string;
  email: string;
  contactNumber: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: {
    father: TGuardian;
    mother: TGuardian;
  };
  localGuardian: TLocalGuardian;
  profileImg?: string;
  isActive?: 'active' | 'inactive';
};









//* for creating static

export interface StudentModel extends Model<TStudent> {
  isUserExists(id:string): Promise<TStudent | null>
}




//*for creating instance

// export type StudentMethods = {
//   isUserExists(id: string): Promise<TStudent | null>;
// };

// export type StudentModel = Model<
//   TStudent,
//   Record<string, never>,
//   StudentMethods
// >;
