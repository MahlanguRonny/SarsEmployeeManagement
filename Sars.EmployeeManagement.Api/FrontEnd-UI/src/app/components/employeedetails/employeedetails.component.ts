import { IContactDetailDto } from './../../models/ContactDetailsDto';
import { IAddressDto } from './../../models/AddressDto';
import { EmployeemanagementService } from './../../services/employeemanagement.service';
import { Router } from '@angular/router';
import { IEmployeeDto } from './../../models/EmployeeDto';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UimsgserviceService } from 'src/app/services/uimsgservice.service';
import { MatAccordion } from '@angular/material/expansion';

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

  @ViewChild(MatAccordion) accordion!: MatAccordion;

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

    this.employeeService.getEmployeeById(+empId).subscribe(data => {
      this.empEditForm.setValue({
        employeeId: data.id,
        firstName: data.firstName,
        surname: data.surname,
        employeeNumber: data.employeeNumber,
        active: data.active,
        mobileNumber: data.contactDetailDto.mobileNumber,
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
    // personal details

    const addressDto: IAddressDto = {
      city: this.empEditForm.value.city,
      addressTypeId: 1, // todo fix this to come from drop down
      id: 1,
      postalCode: this.empEditForm.value.postalCode,
      streetName: this.empEditForm.value.streetName,
      suburb: this.empEditForm.value.suburb
    };

    const contactDetailDto: IContactDetailDto = {
      emailAddress: this.empEditForm.value.emailAddress,
      facebookLink: this.empEditForm.value.facebookLink,
      id: 0,
      landLineNumber: this.empEditForm.value.landLineNumber,
      linkedInLink: this.empEditForm.value.linkedInLink,
      mobileNumber: this.empEditForm.value.mobileNumber
    };

    const employeeDto: IEmployeeDto = {
      firstName: this.empEditForm.value.emailAddress,
      surname: this.empEditForm.value.surname,
      employeeNumber: this.empEditForm.value.employeeNumber,
      id: this.empEditForm.value.employeeId,
      contactDetailsId: 0,
      active: true,
      addressDto,
      contactDetailDto,
      AddressDetailsId: 0,
    };

    this.employeeService.updateEmployee(employeeDto)
      .pipe()
      .subscribe(
        data => {
          this.msgService.showLoading();
          this.msgService.snack('Employee Details updated successfully.');
          this.router.navigate(['/listemployees']);
          this.msgService.showLoading();
        },
        error => {
          alert(JSON.stringify(error));
          this.msgService.showLoading();
        }
      );
  }
}

