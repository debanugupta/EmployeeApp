import {Routes} from '@angular/router';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { EmployeeDetailComponent } from './employees/employee-detail/employee-detail.component';
import { EmployeeListResolver } from './_resolvers/employee-list.resolver';

export const appRoutes: Routes = [
    { path: '', component: EmployeeListComponent},
    { path: 'employees', component: EmployeeListComponent,resolve: {employees: EmployeeListResolver}},
    { path: 'employees/:id', component: EmployeeDetailComponent},
    { path: '**', redirectTo: '', pathMatch: 'full'}
];