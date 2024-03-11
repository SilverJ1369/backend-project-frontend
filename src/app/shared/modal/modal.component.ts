import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

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
  @ViewChild('category') categoryDialog!: ElementRef;

  locationForm = new FormGroup({
    country: new FormControl('', [Validators.required]),
    state: new FormControl(''),
    city: new FormControl(''),
  })

  eventDateForm = new FormGroup({
    year: new FormControl(0, [Validators.required]),
    month: new FormControl(0),
    day: new FormControl(0),
    isAD: new FormControl(true),
    modifier: new FormControl(''),
  })

  categoryForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  })

  constructor() {}

  openLocationDialog() {
    (this.locationDialog.nativeElement as HTMLDialogElement).showModal();
  }
  openEventDialog() {
    (this.eventDateDialog.nativeElement as HTMLDialogElement).showModal();
  }
  openCategoryDialog() {
    (this.categoryDialog.nativeElement as HTMLDialogElement).showModal();
  }

  closeDialog() {
    console.log('close dialog');

    this.locationForm.reset();
    (this.locationDialog.nativeElement as HTMLDialogElement).close();
  }

  locationSubmit() {
    console.log('location submit', this.locationForm.value);
    this.locationForm.reset();
    
  }

  eventSubmit() {
    console.log('event submit');
    this.eventDateForm.reset();
  }

  categorySubmit() {
    console.log('category submit');
    this.categoryForm.reset();
  }

}
