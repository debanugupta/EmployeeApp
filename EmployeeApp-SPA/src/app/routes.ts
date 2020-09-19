import {Routes} from '@angular/router';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { EmployeeDetailComponent } from './employees/employee-detail/employee-detail.component';
import { EmployeeEditComponent } from './employees/employee-edit/employee-edit.component';
import { EmployeeListResolver } from './_resolvers/employee-list.resolver';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_guards/auth.guard';
import { EmployeeDetailResolver } from './_resolvers/employee-detail.resolver';
import { EmployeeEditResolver } from './_resolvers/employee-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';

export const appRoutes: Routes = [

    { path: '', component: HomeComponent},
    {
        path: '',
        // runGuardsAndResolvers: 'always',
        // canActivate: [AuthGuard],
        children: [
            { path: 'employees', component: EmployeeListComponent,
                resolve: {employees: EmployeeListResolver}},
            { path: 'employees/:id', component: EmployeeDetailComponent,
                resolve: {employee: EmployeeDetailResolver}},
            { path: 'employees/edit/:id', component: EmployeeEditComponent,
                resolve: {employee: EmployeeEditResolver} },
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full'}

];