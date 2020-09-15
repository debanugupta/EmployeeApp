import {Injectable} from '@angular/core';
import {Employee} from '../_models/employee';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { EmployeeService } from '../_services/employee.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class EmployeeListResolver implements Resolve<Employee[]> {
    pageNumber = 1;
    pageSize = 5;

    constructor(private employeeService: EmployeeService, private router: Router,
        private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Employee[]> {
        return this.employeeService.getEmployees(this.pageNumber, this.pageSize).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}