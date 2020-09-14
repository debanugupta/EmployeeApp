import { Component, OnInit } from '@angular/core';
import { Employee } from '../../_models/employee';
import { AlertifyService } from 'src/app/_service/alertify.service';
import { EmployeeService } from 'src/app/_service/employee.service';
import { ActivatedRoute } from '@angular/router';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees: Employee[];
  // employee: Employee = JSON.parse(localStorage.getItem('user'));
  genderList = [{value: 'male', display: 'Males'}, {value: 'female', display: 'Females'}];
  employeeParams: any = {};
  pagination: Pagination;


  constructor(private employeeService: EmployeeService, private alertify: AlertifyService,
    private route: ActivatedRoute) { }

    ngOnInit() {
      this.route.data.subscribe(data => {
        this.employees = data['employees'].result;
        this.pagination = data['employees'].pagination;
      });
      // this.employeeParams.gender = this.empl === 'female' ? 'male' : 'female';
      this.employeeParams.minAge = 18;
      this.employeeParams.maxAge = 99;
      this.employeeParams.orderBy = 'lastActive';

    }

    pageChanged(event: any): void {
      this.pagination.currentPage = event.page;
      this.loadEmployees();
    }

    resetFilters() {
      // this.employeeParams.gender = this.user.gender === 'female' ? 'male' : 'female';
      this.employeeParams.minAge = 18;
      this.employeeParams.maxAge = 99;
      this.loadEmployees();
    }

    loadEmployees() {
      this.employeeService
      .getEmployees(this.pagination.currentPage, this.pagination.itemsPerPage, this.employeeParams)
      .subscribe(
        (res: PaginatedResult<Employee[]>) => {
          this.employees = res.result;
          this.pagination = res.pagination;
        },
        error => {
          this.alertify.error(error);
        }
      );
    }

}