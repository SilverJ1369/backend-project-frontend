import { Component, HostListener, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { MainTopic } from '../../shared/models/main-topic';
import { TimelineEvent } from '../../shared/models/timeline-event';
import { MainTopicService } from '../services/main-topic.service';
import { TimelineEventService } from '../services/timeline-event.service';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { SidebarService } from '../services/sidebar.service';
import { SearchService } from '../services/search.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent implements OnInit{

  // some main topics outside of line
  mainTopics: MainTopic[] = [];
  timelineEvents: TimelineEvent[] = [];
  selectedMainTopic: MainTopic | null = null;
  selectedTimelineEvent: TimelineEvent | null = null;
  isSidebarVisible: boolean = false;
  years: number[] = [];
  eventYears: number[] = [];

  lineStart = 0;
  lineEnd = 100;
  timelineEventStart = 0;
  timelineEventEnd = 100;

  linePosition = 75; // Y position of the line
  padding = 10;
  screenWidth = window.innerWidth * 0.8; // Width of the screen
  scale: any = d3.scaleLinear()
  .domain([this.lineStart, this.lineEnd]) // Domain: starting and ending needs to be dynamically generated based on array of events
  .range([this.padding, this.screenWidth - this.padding]); // Range: range of pixels (adjust as needed)
  timelineEventScale: any = d3.scaleLinear()
  .domain([this.timelineEventStart, this.timelineEventEnd]) // Domain: starting and ending needs to be dynamically generated based on array of events
  .range([this.padding, this.screenWidth - this.padding]); // Range: range of pixels (adjust as needed)

  constructor(
    private mainTopicService: MainTopicService,
    private timelineEventService: TimelineEventService,
    private sidebarService: SidebarService,
    private searchService: SearchService) { }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.screenWidth = window.innerWidth * 0.8;
    this.scale.range([this.padding, this.screenWidth - this.padding]);
    this.timelineEventScale.range([this.padding, this.screenWidth - this.padding]);
  }

  ngOnInit(): void {
    this.searchService.searchResults.subscribe({
      next: (mainTopics: MainTopic[]) => {
        this.mainTopics = mainTopics;
        console.log('Main topics:', mainTopics);
        this.lineStart = Math.min(...this.mainTopics.map(mainTopic => mainTopic.start_date.year));
        this.lineEnd = Math.max(...this.mainTopics.map(mainTopic => mainTopic.end_date.year));
        this.scale.domain([this.lineStart, this.lineEnd]);
        const startYear = this.lineStart
        const endYear = this.lineEnd
        const yearInterval = Math.round((endYear - startYear) / 5);
        this.years = Array.from({length: 6}, (_, i) => startYear + i * yearInterval);
        console.log('Years:', this.years);
      },
      error: (error) => {
        console.error('Error fetching main topics:', error);
      }
    });
    this.sidebarService.sidebarOpened.subscribe(opened => {
      this.isSidebarVisible = opened;
    });
  }

  onMainTopicClick(topic: MainTopic) {
    this.sidebarService.selectedMainTopic.next(topic);
    this.sidebarService.selectedTimelineEvent.next(null);
    this.sidebarService.sidebarOpened.next(true);
      this.timelineEventService.searchByMainTopic(topic).subscribe({
        next: (events: TimelineEvent[]) => {
          this.timelineEvents = events;
          this.timelineEventStart = Math.min(...events.map(event => event.event_date.year));
          this.timelineEventEnd = Math.max(...events.map(event => event.event_date.year));
          this.timelineEventScale.domain([this.timelineEventStart, this.timelineEventEnd]);
          const startYear = this.timelineEventStart
          const endYear = this.timelineEventEnd
          const yearInterval = Math.round((endYear - startYear) / 5);
          this.eventYears = Array.from({length: 6}, (_, i) => startYear + i * yearInterval);
          console.log('Events:', events);
        },
        error: (error) => {
          console.error('Error fetching events:', error);
        }
      });
  }

  onTimelineEventClick(event: TimelineEvent) {
    this.sidebarService.selectedTimelineEvent.next(event);
    this.sidebarService.selectedMainTopic.next(null);
    this.isSidebarVisible = true;
  }
}
