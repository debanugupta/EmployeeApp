import { Designation } from './designation';

export interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    emailId: string;
    gender: string;
    dateOfBirth: Date;
    designationId: string;
    designationName: string;
    created: Date;
    lastActive: Date;
    designation?: Designation[];
}
