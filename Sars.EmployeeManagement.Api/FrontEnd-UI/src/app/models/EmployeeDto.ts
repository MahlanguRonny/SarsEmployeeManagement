import { IContactDetailDto } from './ContactDetailsDto';

export interface IEmployeeDto{
id: number;
firstName: string;
surname: string;
employeeNumber: string;
Active: boolean;
contactDetailsId: number;
addressDetailsId: number;
contactDetailDto: IContactDetailDto;
}
