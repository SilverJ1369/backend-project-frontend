import { Component, Input, OnInit } from '@angular/core';
import { MainTopic } from '../models/main-topic';
import { TimelineEvent } from '../models/timeline-event';

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
  @Input() selectedMainTopic!: MainTopic | null
  @Input() selectedTimelineEvent!: TimelineEvent | null

  constructor() { }

  ngOnInit(): void {
    if(this.selectedMainTopic){
      this.mainTopic = this.selectedMainTopic
    }
    if(this.selectedTimelineEvent){
      this.timelineEvent = this.selectedTimelineEvent
    }
  }

}
