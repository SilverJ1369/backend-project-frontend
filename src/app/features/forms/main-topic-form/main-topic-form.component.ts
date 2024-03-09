import { Component, ViewChild } from '@angular/core';
import { ModalComponent } from '../../../shared/modal/modal.component';

@Component({
  selector: 'app-main-topic-form',
  standalone: true,
  imports: [ModalComponent],
  templateUrl: './main-topic-form.component.html',
  styleUrl: './main-topic-form.component.scss'
})
export class MainTopicFormComponent {
  @ViewChild(ModalComponent) modal!: ModalComponent;

  constructor() { }

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
