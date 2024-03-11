import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MainTopicService } from '../../../core/services/main-topic.service';
import { Router } from '@angular/router';
import { ModalComponent } from '../../../shared/modal/modal.component';

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

  constructor(private mainTopicService: MainTopicService, private router: Router) { }

  onSubmit() {

    this.mainTopicService.createMainTopic(this.mainTopicForm.value).subscribe({
      next: () => {
        console.log('Main topic created successfully!');
        this.router.navigate(['/main-topic']);
      },
      error: (error) => {
        console.error('Error creating main topic:', error);
      }
    });
  }

  openLocationModal() {
    this.modal.openLocationDialog();
  }
  openEventModal() {
    this.modal.openEventDialog();
  }
  openEpisodeModal() {
    this.modal.openEpisodeDialog();
  }
}
