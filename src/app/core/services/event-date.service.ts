import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventDateService {

  constructor(private http:HttpClient) { }

  getEventDates() {
    return this.http.get(`${environment.apiUrl}/event-dates`);
  }

  createEventDate(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/event-dates`, data);
  }

  updateEventDate(data: any) {
    return this.http.put(`${environment.apiUrl}/event-dates`, data);
  }

  deleteEventDate(data: any) {
    return this.http.delete(`${environment.apiUrl}/event-dates/${data.id}`);
  }
}
