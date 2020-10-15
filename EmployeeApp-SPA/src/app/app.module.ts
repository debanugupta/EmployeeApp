import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { EmployeeDetailComponent } from './employees/employee-detail/employee-detail.component';
import { EmployeeEditComponent } from './employees/employee-edit/employee-edit.component';
import { EmployeeEditMComponent } from './employees/employee-edit-m/employee-edit-m.component';
import { EmployeeEditRComponent } from './employees/employee-edit-r/employee-edit-r.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { EmployeeListResolver } from './_resolvers/employee-list.resolver';
import { EmployeeDetailResolver } from './_resolvers/employee-detail.resolver';
import { EmployeeEditResolver } from './_resolvers/employee-edit.resolver';
import { NavComponent } from './nav/nav.component';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';

import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';


@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    EmployeeDetailComponent,
    EmployeeEditComponent,
    HomeComponent,
    NavComponent,
    EmployeeEditMComponent,
    EmployeeEditRComponent
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    TabsModule.forRoot(),
    ButtonsModule.forRoot(),
    BrowserAnimationsModule,
    MatInputModule, MatButtonModule, MatCardModule, MatFormFieldModule,
    MatCheckboxModule, MatDatepickerModule, MatRadioModule, MatSelectModule, MatNativeDateModule,
  ],
  providers: [
    EmployeeListResolver,
    EmployeeDetailResolver,
    EmployeeEditResolver,
    PreventUnsavedChanges,
    ReactiveFormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
