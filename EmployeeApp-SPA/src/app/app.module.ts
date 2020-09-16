import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { EmployeeDetailComponent } from './employees/employee-detail/employee-detail.component';
import { EmployeeEditComponent } from './employees/employee-edit/employee-edit.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { HomeComponent } from './home/home.component';
import { EmployeeListResolver } from './_resolvers/employee-list.resolver';
import { EmployeeDetailResolver } from './_resolvers/employee-detail.resolver';
import { EmployeeEditResolver } from './_resolvers/employee-edit.resolver';

@NgModule({
  declarations: [	
    AppComponent,
    EmployeeListComponent,
    EmployeeDetailComponent,
    EmployeeEditComponent,
      HomeComponent
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    TabsModule.forRoot(),
    ButtonsModule.forRoot()
  ],
  providers: [
    EmployeeListResolver,
    EmployeeDetailResolver,
    EmployeeEditResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
