import { Component, OnDestroy, OnInit } from '@angular/core';
import { MainTopic } from '../models/main-topic';
import { TimelineEvent } from '../models/timeline-event';
import { SidebarService } from '../../core/services/sidebar.service';
import { Subscription } from 'rxjs';
import { MainTopicService } from '../../core/services/main-topic.service';
import { TimelineEventService } from '../../core/services/timeline-event.service';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit, OnDestroy{

  mainTopic!: MainTopic
  timelineEvent!: TimelineEvent
  private subscriptions: Subscription[] = [];

  constructor(
    private sidebarService: SidebarService,
    private mainTopicService: MainTopicService,
    private timelineEventService: TimelineEventService,
    private router: Router,
    public authService: AuthService) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.sidebarService.selectedMainTopic.subscribe(topic => {
        this.mainTopic = topic!;
      }),
      this.sidebarService.selectedTimelineEvent.subscribe(event => {
        this.timelineEvent = event!;
      })
    );
  }

  editMainTopic(topicID: number) {
    this.mainTopicService.editMode.next(true);
    this.router.navigate(['/main-topic-form']);
  }

  deleteMainTopic(topicID: number) {
    this.mainTopicService.deleteMainTopic(topicID);
  }

  editTimelineEvent(eventID: number) {

  }

  deleteTimelineEvent(eventID: number) {
    this.timelineEventService.deleteTimelineEvent(eventID);
  }

  toggleSidebar(): void {
    this.sidebarService.sidebarOpened.next(false);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
