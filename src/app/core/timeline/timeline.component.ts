import { Component } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent {

  linePosition = 50;
  padding = 10;
  scale = d3.scaleLinear()
    .domain([2000, new Date().getFullYear()]) // Domain: starting and ending needs to be dynamically generated based on array of events
    .range([this.padding, 1600 - this.padding]); // Range: range of pixels (adjust as needed)

  // events: Event[] = [
  //   { id: 1, title: 'Event 1', description: 'This is event 1', date: new Date(2000, 0, 1) },
  //   { id: 2, title: 'Event 2', description: 'This is event 2', date: new Date(2022, 0, 1) },
  //   { id: 3, title: 'Event 3', description: 'This is event 3', date: new Date(2012, 0, 1) },
  //   // More events...
  // ];

  onEventClick(id: number) {
    console.log(`Event with id ${id} was clicked.`);
    // Navigate to a detailed view, or perform some other action...
  }

  // getStartYear() {
  //   return this.scale(Math.min(...this.events.map(event => event.date.getFullYear())));
  // }

  // getEndYear() {
  //   return this.scale(Math.max(...this.events.map(event => event.date.getFullYear())));
  // }
}
