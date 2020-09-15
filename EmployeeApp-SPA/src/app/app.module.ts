import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { EmployeeDetailComponent } from './employees/employee-detail/employee-detail.component';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    EmployeeDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
