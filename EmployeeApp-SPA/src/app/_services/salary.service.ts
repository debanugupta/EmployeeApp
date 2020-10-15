import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Salary } from '../_models/salary';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalaryService {

  baseUrl = environment.apiUrl;
  salaries: Salary[] = [];
  constructor(private http: HttpClient) { }

    getSalaries(): Observable<Salary[]> {
    if (this.salaries.length > 0) { return of(this.salaries); }
    return this.http.get<Salary[]>(this.baseUrl + 'salaries').pipe(
      map(salaries => {
        this.salaries = salaries;
        return salaries;
      })
    );
  }
}

