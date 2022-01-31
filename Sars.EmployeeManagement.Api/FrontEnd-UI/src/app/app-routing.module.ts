import { HomepageComponent } from './shared/homepage/homepage.component';
import { NewemployeeComponent } from './components/newemployee/newemployee.component';
import { ListemployeesComponent } from './components/listemployees/listemployees.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeedetailsComponent } from './components/employeedetails/employeedetails.component';

const routes: Routes = [
  { path: 'listemployees', component: ListemployeesComponent },
  { path: 'employeedetails', component: EmployeedetailsComponent },
  { path: 'newemployee', component: NewemployeeComponent },
  { path: '', component: HomepageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
