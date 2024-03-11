import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {

  @ViewChild('locationDialog') locationDialog!: ElementRef;
  @ViewChild('eventDateDialog') eventDateDialog!: ElementRef;
  @ViewChild('timesuckEpisodeDialog') timesuckEpisodeDialog!: ElementRef;

  locationForm = new FormGroup({
    country: new FormControl(''),
    state: new FormControl(''),
    city: new FormControl(''),
  })

  constructor() {}

  openLocationDialog() {
    (this.locationDialog.nativeElement as HTMLDialogElement).showModal();
  }
  openEventDialog() {
    (this.eventDateDialog.nativeElement as HTMLDialogElement).showModal();
  }
  openEpisodeDialog() {
    (this.timesuckEpisodeDialog.nativeElement as HTMLDialogElement).showModal();
  }

  closeDialog() {
    console.log('close dialog');

    this.locationForm.reset();
    (this.locationDialog.nativeElement as HTMLDialogElement).close();
  }

  locationSubmit() {
    console.log('location submit', this.locationForm.value);
    this.locationForm.reset();
    // this.closeDialog();
  }

}
