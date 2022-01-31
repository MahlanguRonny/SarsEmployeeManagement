import { EmployeemanagementService } from './../../services/employeemanagement.service';
import { Router } from '@angular/router';
import { IEmployeeDto } from './../../models/EmployeeDto';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UimsgserviceService } from 'src/app/services/uimsgservice.service';

@Component({
  selector: 'app-employeedetails',
  templateUrl: './employeedetails.component.html',
  styleUrls: ['./employeedetails.component.scss']
})
export class EmployeedetailsComponent implements OnInit {
  emp!: IEmployeeDto;
  empEditForm!: FormGroup;
  employeeId = 0;
  firstName = '';
  surname = '';
  employeeNumber = '';
  contactDetailsId = 0;
  addressDetailsId = 0;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private employeeService: EmployeemanagementService,
    private msgService: UimsgserviceService,
  ) { }

  ngOnInit(): void {
    const empId = localStorage.getItem('empId');
    if (!empId) {
      this.router.navigate(['listemployees']);
      return;
    }
    this.empEditForm = this.formBuilder.group({
      id: ['empId'],
      firstName: ['', Validators.required],
      surname: ['', Validators.required],
      employeeNumber: ['', Validators.required],
      active: true,
      mobileNumber: [''],
      emailAddress: ['', Validators.required],
      landLineNumber: [''],
      facebookLink: [''],
      linkedInLink: [''],
      streetName: [''],
      suburb: [''],
      city: [''],
      postalCode: [''],
      addressTypeId: [''],
      addressDetailsId: [''],
    });

    this.employeeService.getEmployeeById(+empId).subscribe(data => {
      console.log(JSON.stringify(data.addressDto));
      this.empEditForm.setValue({
        id: data.id,
        firstName: data.firstName,
        surname: data.surname,
        employeeNumber: data.employeeNumber,
        active: data.active,
        mobileNumber: data.contactDetailDto.id,
        emailAddress: data.contactDetailDto.emailAddress,
        landLineNumber: data.contactDetailDto.landLineNumber,
        linkedInLink: data.contactDetailDto.linkedInLink,
        facebookLink: data.contactDetailDto.facebookLink,
        addressDetailsId: data.addressDto.id,
        streetName: data.addressDto.streetName,
        suburb: data.addressDto.suburb,
        city: data.addressDto.city,
        postalCode: data.addressDto.postalCode,
        addressTypeId: data.addressDto.addressTypeId
      });
    });
  }

  onSubmit(): void {
    if (this.empEditForm.invalid){
      return;
    }

    this.employeeService.updateEmployee(this.empEditForm.value)
      .pipe()
      .subscribe(
        data => {
          this.msgService.snack('Employee Details updated successfully.');
          this.router.navigate(['/components/listemployees']);
        },
        error => {
          alert(JSON.stringify(error));
        }
      );
  }
}

