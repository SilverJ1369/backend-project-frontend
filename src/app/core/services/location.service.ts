import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Location } from '../../shared/models/location';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  getLocations() {
    return this.http.get(`${environment.apiUrl}/locations`);
  }

  createLocation(data: any): Observable<any>{
    console.log(data);

    return this.http.post(`${environment.apiUrl}/locations`, data);
  }

  updateLocation(location: Location) {
    return this.http.put(`${environment.apiUrl}/locations`, location);
  }

  deleteLocation(location: any) {
    return this.http.delete(`${environment.apiUrl}/locations/${location.id}`);
  }
}
