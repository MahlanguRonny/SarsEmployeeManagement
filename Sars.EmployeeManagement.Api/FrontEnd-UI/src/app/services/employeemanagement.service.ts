import { IEmployeeDto } from './../models/EmployeeDto';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeemanagementService {
  employeeManagementApi = environment.employeeApiBaseUrl;

  constructor(
    private http: HttpClient,
    ) { }

    getAllEmployees(): Observable<IEmployeeDto[]> {
      return this.http.get<IEmployeeDto[]>(`${this.employeeManagementApi}/api/employee/GetEmployeeList`);
    }

    deleteEmployee(id: number): Observable<ArrayBuffer>{
      return this.http.delete<ArrayBuffer>(`${this.employeeManagementApi}/api/employee/${id}`);
    }

    getEmployeeById(id: number): Observable<IEmployeeDto>{
      return this.http.get<IEmployeeDto>(`${this.employeeManagementApi}/api/employee/GetEmployeeById/${id}`);
    }

    updateEmployee(employeeDto: IEmployeeDto): Observable<object>{
      console.log('to the api ' + JSON.stringify(employeeDto));
      return this.http.put(`${this.employeeManagementApi}/api/employee/UpdateEmployee`, employeeDto);
    }
}
