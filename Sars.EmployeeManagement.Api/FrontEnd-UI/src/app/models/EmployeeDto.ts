import { IAddressDto } from './AddressDto';
import { IContactDetailDto } from './ContactDetailsDto';

export interface IEmployeeDto{
id: number;
firstName: string;
surname: string;
employeeNumber: string;
active: boolean;
contactDetailsId: number;
AddressDetailsId: number;
contactDetailDto: IContactDetailDto;
addressDto: IAddressDto;
}
