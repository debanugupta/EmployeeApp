import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../_models/employee';
import { PaginatedResult } from '../_models/pagination';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getEmployees(page?, itemsPerPage?, employeeParams?, likesParams?): Observable<PaginatedResult<Employee[]>> {
    const paginatedResult: PaginatedResult<Employee[]> = new PaginatedResult<Employee[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (employeeParams != null){
      params = params.append('minAge', employeeParams.minAge);
      params = params.append('maxAge', employeeParams.maxAge);
      params = params.append('gender', employeeParams.gender);
      params = params.append('orderBy', employeeParams.orderBy);
    }

    return this.http.get<Employee[]>(this.baseUrl + 'employees', { observe: 'response', params})
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResult;
        })
      );
  }

  getEmployee(id): Observable<Employee> {
    return this.http.get<Employee>(this.baseUrl + 'employees/' + id);
  }

  updateEmployee(id: number, emplyee: Employee) {
    return this.http.put(this.baseUrl + 'employees/' + id, emplyee);
  }

  addEmployee(emplyee: Employee){
    return this.http.post(this.baseUrl + 'employees', emplyee);
  }


  deleteEmployee(id: number) {
    return this.http.delete(this.baseUrl + 'employees/' + id );
  }
}

