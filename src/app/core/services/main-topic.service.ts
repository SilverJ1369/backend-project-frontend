import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { MainTopic } from '../../shared/models/main-topic';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MainTopicService {

  editMode: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  getMainTopics(): Observable<MainTopic[]> {
    return this.http.get<MainTopic[]>(`${environment.apiUrl}/main_topics`);
  }

  createMainTopic(data: any): Observable<MainTopic> {
    return this.http.post<MainTopic>(`${environment.apiUrl}/main_topics`, data);
  }

  updateMainTopic(mainTopicID: number): Observable<MainTopic> {
    return this.http.patch<MainTopic>(`${environment.apiUrl}/main_topics`, mainTopicID);
  }

  deleteMainTopic(mainTopicID: number){
    this.http.delete<MainTopic>(`${environment.apiUrl}/main_topics/${mainTopicID}`);
  }
}
