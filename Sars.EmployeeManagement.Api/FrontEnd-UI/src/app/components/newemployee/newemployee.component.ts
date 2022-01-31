import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IAddressDto } from 'src/app/models/AddressDto';
import { IContactDetailDto } from 'src/app/models/ContactDetailsDto';
import { IEmployeeDto } from 'src/app/models/EmployeeDto';
import { EmployeemanagementService } from 'src/app/services/employeemanagement.service';
import { UimsgserviceService } from 'src/app/services/uimsgservice.service';

@Component({
  selector: 'app-newemployee',
  templateUrl: './newemployee.component.html',
  styleUrls: ['./newemployee.component.scss']
})
export class NewemployeeComponent implements OnInit {
  newEmpForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private employeeService: EmployeemanagementService,
    private msgService: UimsgserviceService,
  ) { }

  ngOnInit(): void {
    this.newEmpForm = this.formBuilder.group({
      employeeId: ['empId'],
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
  }

  onSubmit(): void {
    if (this.newEmpForm.invalid){
      return;
    }
    // personal details

    const addressDto: IAddressDto = {
      city: this.newEmpForm.value.city,
      addressTypeId: 1, // todo fix this to come from drop down
      id: 1,
      postalCode: this.newEmpForm.value.postalCode,
      streetName: this.newEmpForm.value.streetName,
      suburb: this.newEmpForm.value.suburb
    };

    const contactDetailDto: IContactDetailDto = {
      emailAddress: this.newEmpForm.value.emailAddress,
      facebookLink: this.newEmpForm.value.facebookLink,
      id: 1,
      landLineNumber: this.newEmpForm.value.landLineNumber,
      linkedInLink: this.newEmpForm.value.linkedInLink,
      mobileNumber: this.newEmpForm.value.mobileNumber
    };

    const employeeDto: IEmployeeDto = {
      firstName: this.newEmpForm.value.emailAddress,
      surname: this.newEmpForm.value.surname,
      employeeNumber: this.newEmpForm.value.employeeNumber,
      id: 1,
      contactDetailsId: 1,
      active: true,
      addressDto,
      contactDetailDto,
      AddressDetailsId: 1,
    };
    
    this.employeeService.addNewEmployee(employeeDto)
      .pipe()
      .subscribe(
        data => {
          this.msgService.showLoading();
          this.msgService.snack(`New employee ${employeeDto.firstName} ${employeeDto.surname} has been successfully created`);
          this.router.navigate(['/listemployees']);
          this.msgService.hideLoading();
        },
        error => {
          alert(JSON.stringify(error));
          this.msgService.hideLoading();
        }
      );
  }

}
