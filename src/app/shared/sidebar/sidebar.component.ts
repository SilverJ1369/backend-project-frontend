import { Component, Input, OnInit } from '@angular/core';
import { MainTopic } from '../models/main-topic';
import { TimelineEvent } from '../models/timeline-event';
import { SidebarService } from '../../core/services/sidebar.service';
import { Subscription } from 'rxjs';

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

  constructor(private sidebarService: SidebarService) { }

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

  toggleSidebar(): void {
    this.sidebarService.sidebarOpened.next(false);
  }
}
