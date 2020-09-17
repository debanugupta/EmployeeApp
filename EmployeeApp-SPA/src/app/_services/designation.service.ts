import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Designation } from '../_models/designation';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DesignationService {
  baseUrl = environment.apiUrl;
  designations: Designation[] = [];

  
  constructor(private http: HttpClient) { }

  getDesignations() {
    // return this.http.get(this.baseUrl + 'designations');
    if (this.designations.length > 0) return of(this.designations);
    return this.http.get<Designation[]>(this.baseUrl + 'designations').pipe(
      map(designations => {
        this.designations = designations;
        return designations;
      })
    )
  }

}
