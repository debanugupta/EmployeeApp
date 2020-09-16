import { Injectable } from '@angular/core';
import { Employee } from '../_models/employee';
import { Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { EmployeeService } from '../_services/employee.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class EmployeeDetailResolver implements Resolve<Employee> {
    constructor(private employeeService: EmployeeService, private router: Router,
        private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Employee> {
        return this.employeeService.getEmployee(route.params['id']).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/employee']);
                return of(null);
            })
        );
    }
}