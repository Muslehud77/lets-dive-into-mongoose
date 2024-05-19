export type Guardian = {
  name: string;
  occupation: string;
  contactNumber: string;
};

export interface LocalGuardian extends Guardian {
  address: string;
}

export type UserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type Student = {
  id: string;
  name: UserName;
  gender: 'male' | 'female';
  dateOfBirth?: string;
  email: string;
  contactNumber: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: {
    father: Guardian;
    mother: Guardian;
  };
  localGuardian: LocalGuardian;
  profileImg?: string;
  isActive: 'active' | 'inactive';
};
