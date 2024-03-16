import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/categories`);
  }

  createCategory(data: any): Observable<any> {
    console.log('Data:', data);

    return this.http.post(`${environment.apiUrl}/categories`, data);
  }

  updateCategory(data: any) {
    return this.http.put(`${environment.apiUrl}/categories`, data);
  }

  deleteCategory(data: any) {
    return this.http.delete(`${environment.apiUrl}/categories/${data.id}`);
  }
}
