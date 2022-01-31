import { IEmployeeDto } from './../../models/EmployeeDto';
import { EmployeemanagementService } from './../../services/employeemanagement.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UimsgserviceService } from 'src/app/services/uimsgservice.service';
import { ErrordialogComponent } from 'src/app/shared/dialogs/errordialog/errordialog.component';

@Component({
  selector: 'app-listemployees',
  templateUrl: './listemployees.component.html',
  styleUrls: ['./listemployees.component.scss']
})
export class ListemployeesComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public pageEvent!: PageEvent;
  // public filter_ActiveEmployees = true;

  constructor(
    private router: Router,
    private employeeService: EmployeemanagementService,
    private dialog: MatDialog,
    private msgService: UimsgserviceService
  ) {}
  displayedColumns = [
    'id',
    'firstName',
    'surname',
    'employeeNumber',
    'active',
    'actions'
  ];

  dataSource = new MatTableDataSource();

  ngOnInit(): void {
    this.loadEmployees();
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  searchEmployees(searchValue: string): void {
    searchValue = searchValue.trim();
    searchValue.toLocaleLowerCase();
    this.dataSource.filter = searchValue;
  }

  viewEmpDetails(emp: IEmployeeDto): void {
    localStorage.removeItem('empId');
    localStorage.setItem('empId', emp.id.toString());
    this.router.navigate(['/employeedetails']);
  }

  loadEmployees(): void {
    this.msgService.showLoading();
    this.employeeService.getAllEmployees().subscribe(
      res => {
        this.dataSource.data = res;
        this.dataSource.paginator = this.paginator;
        this.msgService.hideLoading();
      },
      error => {
        this.showError('An error occured while loading the users, please try again or contact the administrator');
        this.msgService.hideLoading();
      }
    );
  }

  deleteEmployee(emp: IEmployeeDto): void {
    this.msgService
      .confirm('Are you sure you want to delete this user?')
      .then(result => {
        if (result === true) {
          this.msgService.showLoading();
          this.employeeService.deleteEmployee(emp.id).subscribe(
            r => {
              this.msgService.hideLoading();

              this.msgService.snack(
                `${emp.firstName} ${emp.surname} has been successfully deleted`
              );
              this.ngOnInit();
            },
            e => {
              this.msgService.hideLoading();
              console.log(e);
            }
          );
        }
      });
  }

  showError(error: string): void {
    this.dialog.open(ErrordialogComponent, {
      data: error,
      width: '250px'
    });
  }

  toggleChange(): void {
     // this.filter_ActiveUsers = !this.filter_ActiveUsers;
    this.loadEmployees();
  }
}
