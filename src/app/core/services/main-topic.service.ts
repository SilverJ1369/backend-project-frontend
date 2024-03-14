import { Injectable } from '@angular/core';
import { MainTopic } from '../../shared/models/main-topic';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MainTopicService {

  constructor(private http: HttpClient) { }

  getMainTopics(): Observable<MainTopic[]> {
    return this.http.get<MainTopic[]>(`${environment.apiUrl}/main_topics`);
  }

  createMainTopic(data: any): Observable<MainTopic> {
    return this.http.post<MainTopic>(`${environment.apiUrl}/main_topics`, data);
  }

  updateMainTopic(mainTopic: MainTopic): Observable<MainTopic> {
    return this.http.put<MainTopic>(`${environment.apiUrl}/main_topics`, mainTopic);
  }

  deleteMainTopic(mainTopic: MainTopic): Observable<MainTopic> {
    return this.http.delete<MainTopic>(`${environment.apiUrl}/main_topics/${mainTopic.id}`);
  }
}
