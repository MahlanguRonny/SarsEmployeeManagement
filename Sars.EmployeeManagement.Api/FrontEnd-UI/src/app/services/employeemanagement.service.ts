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
}
