import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { MainTopic } from '../../shared/models/main-topic';
import { TimelineEvent } from '../../shared/models/timeline-event';
import { MainTopicService } from '../services/main-topic.service';
import { TimelineEventService } from '../services/timeline-event.service';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent implements OnInit{

  // some main topics outside of line
  mainTopics: MainTopic[] = [];
  timelineEvents: TimelineEvent[] = [];

  lineStart = 0;
  lineEnd = 100;
  timelineEventStart = 0;
  timelineEventEnd = 100;

  linePosition = 75; // Y position of the line
  padding = 10;
  scale: any = d3.scaleLinear()
  .domain([this.lineStart, this.lineEnd]) // Domain: starting and ending needs to be dynamically generated based on array of events
  .range([this.padding, 1600]); // Range: range of pixels (adjust as needed)
  timelineEventScale: any = d3.scaleLinear()
  .domain([this.timelineEventStart, this.timelineEventEnd]) // Domain: starting and ending needs to be dynamically generated based on array of events
  .range([this.padding, 1600]); // Range: range of pixels (adjust as needed)

  constructor(private mainTopicService: MainTopicService, private timelineEventService: TimelineEventService) { }

  ngOnInit(): void {
    this.mainTopicService.getMainTopics().subscribe({
      next: (mainTopics: MainTopic[]) => {
        this.mainTopics = mainTopics;
        console.log('Main topics:', mainTopics);
        this.lineStart = Math.min(...this.mainTopics.map(mainTopic => mainTopic.start_date.year));
        this.lineEnd = Math.max(...this.mainTopics.map(mainTopic => mainTopic.end_date.year));
        this.scale.domain([this.lineStart, this.lineEnd]);
      },
      error: (error) => {
        console.error('Error fetching main topics:', error);
      }
    });
  }


  onEventClick(topic: MainTopic) {
    console.log('Event clicked:', topic);
      this.timelineEventService.searchByMainTopic(topic).subscribe({
        next: (events: TimelineEvent[]) => {
          this.timelineEvents = events;
          this.timelineEventStart = Math.min(...events.map(event => event.event_date.year));
          this.timelineEventEnd = Math.max(...events.map(event => event.event_date.year));
          this.timelineEventScale.domain([this.timelineEventStart, this.timelineEventEnd]);
          console.log('Events:', events);
        },
        error: (error) => {
          console.error('Error fetching events:', error);
        }
      });
  }

  getStartYear() {
    if (this.mainTopics.length === 0 && this.timelineEvents.length === 0) {
      console.error('No events to display.');
      return null;
    } else if (this.timelineEvents.length === 0) {
      console.log('mainTopics', Math.min(...this.mainTopics.map(mainTopic => mainTopic.start_date.year)));

      return this.scale(Math.min(...this.mainTopics.map(mainTopic => mainTopic.start_date.year)));
    } else {
      return this.scale(Math.min(...this.timelineEvents.map(event => event.event_date.year)));
    }
  }

  getEndYear() {
    if (this.mainTopics.length === 0 && this.timelineEvents.length === 0) {
      console.error('No events to display.');
      return null;
    } else if (this.timelineEvents.length === 0) {
      return this.scale(Math.max(...this.mainTopics.map(mainTopic => mainTopic.end_date.year)));
    } else {
      return this.scale(Math.max(...this.timelineEvents.map(event => event.event_date.year)));
    }
  }
}
