import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MainTopic } from '../../../shared/models/main-topic';
import { MainTopicService } from '../../../core/services/main-topic.service';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { TimelineEventService } from '../../../core/services/timeline-event.service';

@Component({
  selector: 'app-timeline-event-form',
  standalone: true,
  imports: [ReactiveFormsModule, ModalComponent],
  templateUrl: './timeline-event-form.component.html',
  styleUrl: './timeline-event-form.component.scss'
})
export class TimelineEventFormComponent implements OnInit{

  mainTopics: MainTopic[] = [];

  @ViewChild(ModalComponent) modal!: ModalComponent;

  @Input() locationID!: number;
  @Input() eventDateID!: number;

  timelineEventForm = new FormGroup({
    main_topic_id: new FormControl(null, Validators.required),
    location_id: new FormControl(0, Validators.required),
    details: new FormControl(''),
    event_date_id: new FormControl(0),
    is_graphic: new FormControl(false),
  });

  constructor(private mainTopicService: MainTopicService, private timelineEventService: TimelineEventService) { }

  ngOnInit(): void {
    this.mainTopicService.getMainTopics().subscribe({
      next: (mainTopics: MainTopic[]) => {
        this.mainTopics = mainTopics;
        console.log(this.mainTopics);
      }
    })
  }

  onSubmit() {
    this.timelineEventForm.value.location_id = this.locationID;
    this.timelineEventForm.value.event_date_id = this.eventDateID;
    this.timelineEventService.createTimelineEvent(this.timelineEventForm.value).subscribe({
      next: (res) => {
        console.log(res);
      }
    })
  }

  openLocationModal() {
    this.modal.openLocationDialog();
  }

  openEventDateModal() {
    this.modal.openEventDateDialog();
  }

}
