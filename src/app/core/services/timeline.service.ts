import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MainTopic } from '../../shared/models/main-topic';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TimelineService {

  constructor(private http: HttpClient) { }

  getMainTopics(): Observable<MainTopic[]> {
    return this.http.get<MainTopic[]>(`${environment.apiUrl}/main_topic`);
  }
}
