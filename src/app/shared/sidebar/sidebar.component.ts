import { Component, OnInit } from '@angular/core';
import { MainTopic } from '../models/main-topic';
import { TimelineEvent } from '../models/timeline-event';
import { SidebarService } from '../../core/services/sidebar.service';
import { Subscription } from 'rxjs';
import { MainTopicService } from '../../core/services/main-topic.service';
import { TimelineEventService } from '../../core/services/timeline-event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit{

  mainTopic!: MainTopic
  timelineEvent!: TimelineEvent
  private subscriptions: Subscription[] = [];

  constructor(
    private sidebarService: SidebarService,
    private mainTopicService: MainTopicService,
    private timelineEventService: TimelineEventService,
    private router: Router) { }

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
    console.log(topicID);
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

}
