import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MainTopic } from '../../shared/models/main-topic';
import { TimelineEvent } from '../../shared/models/timeline-event';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  selectedMainTopic: BehaviorSubject<MainTopic | null> = new BehaviorSubject<MainTopic | null>(null);
  selectedTimelineEvent: BehaviorSubject<TimelineEvent | null> = new BehaviorSubject<TimelineEvent | null>(null);
  sidebarOpened: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }
}
