import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment} from '../../../environments/environment'
import { TimelineEvent } from '../../shared/models/timeline-event';

@Injectable({
  providedIn: 'root'
})
export class TimelineEventService {

  constructor(private http: HttpClient) { }

  getTimelineEvents() {
    return this.http.get(`${environment.apiUrl}/timeline-events`);
  }

  createTimelineEvent(timelineEvent: TimelineEvent) {
    return this.http.post(`${environment.apiUrl}/timeline-events`, timelineEvent);
  }

  updateTimelineEvent(timelineEvent: TimelineEvent) {
    return this.http.put(`${environment.apiUrl}/timeline-events`, timelineEvent);
  }

  deleteTimelineEvent(timelineEvent: TimelineEvent) {
    return this.http.delete(`${environment.apiUrl}/timeline-events/${timelineEvent.id}`);
  }
}
