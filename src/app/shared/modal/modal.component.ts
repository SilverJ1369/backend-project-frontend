import { Component, ElementRef, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { LocationService } from '../../core/services/location.service';
import { EventDateService } from '../../core/services/event-date.service';

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
  @ViewChild('categoryDialog') categoryDialog!: ElementRef;

  @Output() locationId!: number;
  @Output() startDateID!: number;
  @Output() endDateID!: number;
  @Output() categoryID!: number;

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

  constructor(
    private locationService: LocationService,
    private eventDateService: EventDateService
  ) {}

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
    this.locationForm.reset();
    console.log('close dialog');

    (this.locationDialog.nativeElement as HTMLDialogElement).close();
  }

  locationSubmit(): number | void {
    this.locationService.createLocation(this.locationForm.value).subscribe({
      next: (res) => {
        this.locationId = res.id;
      }
    });
    this.locationForm.reset();
  }

  startDateSubmit() {
    this.eventDateService.createEventDate(this.eventDateForm.value).subscribe({
      next: (res) => {
        this.startDateID = res.id;
      }
    });
    this.eventDateForm.reset();
  }
  endDateSubmit() {
    this.eventDateService.createEventDate(this.eventDateForm.value).subscribe({
      next: (res) => {
        this.endDateID = res.id;
      }
    });
    this.eventDateForm.reset();
  }

  categorySubmit() {
    console.log('category submit');
    this.categoryForm.reset();
  }

}
