import {Injectable} from '@angular/core';
import {Employee} from '../_models/employee';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { EmployeeService } from '../_services/employee.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
// import { AuthService } from '../_services/auth.service';

@Injectable()
export class EmployeeEditResolver implements Resolve<Employee> {
    constructor(private userService: EmployeeService,
        // private authService: AuthService,
         private router: Router, private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Employee> {
        return this.userService.getEmployee(route.params['id']).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving employee data');
                this.router.navigate(['/employees']);
                return of(null);
            })
        );
    }
}