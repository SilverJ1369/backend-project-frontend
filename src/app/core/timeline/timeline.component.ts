import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { MainTopic } from '../../shared/models/main-topic';
import { TimelineEvents } from '../../shared/models/timeline-events';
import { TimelineService } from '../services/timeline.service';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent implements OnInit{

  constructor(private timelineService: TimelineService) { }

  ngOnInit(): void {
    this.timelineService.getMainTopics().subscribe({
      next: (mainTopics: MainTopic[]) => {
        this.mainTopics = mainTopics;
        let minYear = Math.min(...this.mainTopics.map(mainTopic => mainTopic.start_date.year));
        let maxYear = Math.max(...this.mainTopics.map(mainTopic => mainTopic.end_date.year));

        this.lineStart = minYear;
        this.lineEnd = maxYear;

        this.scale.domain([this.lineStart, this.lineEnd]);
        console.log('min, max year', minYear, maxYear);
        console.log('scale', this.scale(minYear), this.scale(maxYear));
        console.log('start, end', this.lineStart, this.lineEnd);
        console.log('mainTopics', this.mainTopics);





      },
      error: (error) => {
        console.error('Error fetching main topics:', error);
      }
    });
  }
  mainTopics: MainTopic[] = [];
  timelineEvents: TimelineEvents[] = [];

  lineStart = 0;
  lineEnd = 100;

  linePosition = 50;
  padding = 10;
  scale: any = d3.scaleLinear()
    .domain([this.lineStart, this.lineEnd]) // Domain: starting and ending needs to be dynamically generated based on array of events
    .range([this.padding, 1600]); // Range: range of pixels (adjust as needed)

  onEventClick(topic: MainTopic) {
    console.log('Event clicked:', topic);

    // Navigate to a detailed view, or perform some other action...
  }

  getStartYear() {
    if (this.mainTopics.length === 0 && this.timelineEvents.length === 0) {
      console.error('No events to display.');
      return null;
    } else if (this.timelineEvents.length === 0) {
      console.log('mainTopics', Math.min(...this.mainTopics.map(mainTopic => mainTopic.start_date.year)));

      return this.scale(Math.min(...this.mainTopics.map(mainTopic => mainTopic.start_date.year)));
    } else {
      return this.scale(Math.min(...this.timelineEvents.map(event => event.eventDate.year)));
    }
  }

  getEndYear() {
    if (this.mainTopics.length === 0 && this.timelineEvents.length === 0) {
      console.error('No events to display.');
      return null;
    } else if (this.timelineEvents.length === 0) {
      return this.scale(Math.max(...this.mainTopics.map(mainTopic => mainTopic.end_date.year)));
    } else {
      return this.scale(Math.max(...this.timelineEvents.map(event => event.eventDate.year)));
    }
  }
}
