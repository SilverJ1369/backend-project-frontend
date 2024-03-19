import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment} from '../../../environments/environment'
import { TimelineEvent } from '../../shared/models/timeline-event';
import { Observable } from 'rxjs';
import { MainTopic } from '../../shared/models/main-topic';

@Injectable({
  providedIn: 'root'
})
export class TimelineEventService {

  constructor(private http: HttpClient) { }

  getTimelineEvents() {
    return this.http.get(`${environment.apiUrl}/timeline_events`);
  }

  createTimelineEvent(data: any): Observable<TimelineEvent> {
    return this.http.post<TimelineEvent>(`${environment.apiUrl}/timeline_events`, data);
  }

  updateTimelineEvent(timelineEvent: TimelineEvent) {
    return this.http.put(`${environment.apiUrl}/timeline_events`, timelineEvent);
  }

  deleteTimelineEvent(timelineEvent: TimelineEvent) {
    return this.http.delete(`${environment.apiUrl}/timeline_events/${timelineEvent.id}`);
  }

  searchByMainTopic(mainTopic: MainTopic): Observable<TimelineEvent[]> {
    return this.http.get<TimelineEvent[]>(`${environment.apiUrl}/timeline_events/search_by_main_topic/${mainTopic.name}`);
  }
}
