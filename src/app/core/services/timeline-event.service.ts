import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment} from '../../../environments/environment'
import { TimelineEvent } from '../../shared/models/timeline-event';
import { Observable } from 'rxjs';

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
}
