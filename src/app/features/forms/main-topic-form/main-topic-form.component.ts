import { Component, Input, ViewChild, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MainTopicService } from '../../../core/services/main-topic.service';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { Location } from '../../../shared/models/location';

@Component({
  selector: 'app-main-topic-form',
  standalone: true,
  imports: [ReactiveFormsModule, ModalComponent],
  templateUrl: './main-topic-form.component.html',
  styleUrl: './main-topic-form.component.scss'
})
export class MainTopicFormComponent {
  mainTopicForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    location: new FormControl(0, [Validators.required]),
    category: new FormControl(0, [Validators.required]),
    startDate: new FormControl(0, [Validators.required]),
    endDate: new FormControl(0, [Validators.required]),
  });
  @ViewChild(ModalComponent) modal!: ModalComponent;

  @Input() locationID!: number;
  @Input() startDateID!: number;
  @Input() endDateID!: number;
  @Input() categoryID!: number;


  constructor(private mainTopicService: MainTopicService, private router: Router) { }

  onSubmit() {
    this.mainTopicForm.value.location = this.locationID;
    this.mainTopicForm.value.startDate = this.startDateID;
    this.mainTopicForm.value.endDate = this.endDateID;
    this.mainTopicForm.value.category = this.categoryID;
    this.mainTopicService.createMainTopic(this.mainTopicForm.value).subscribe({
      next: () => {
        console.log('Main topic created successfully!');
        this.router.navigate(['/timeline']);
      },
      error: (error) => {
        console.error('Error creating main topic:', error);
      }
    });
  }

  openLocationModal() {
    this.modal.openLocationDialog();

  }
  openStartDateModal() {
    this.modal.openStartDateDialog();
  }
  openEndDateModal() {
    this.modal.openEndDateDialog();
  }

}
