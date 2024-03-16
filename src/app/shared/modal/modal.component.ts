import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
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
  @ViewChild('startDateDialog') startDateDialog!: ElementRef;
  @ViewChild('endDateDialog') endDateDialog!: ElementRef;
  @ViewChild('eventDateDialog') eventDateDialog!: ElementRef;
  @ViewChild('categoryDialog') categoryDialog!: ElementRef;

  @Output() locationID = new EventEmitter<number>();
  @Output() startDateID = new EventEmitter<number>();
  @Output() endDateID = new EventEmitter<number>();
  @Output() eventDateID = new EventEmitter<number>();

  locationForm = new FormGroup({
    country: new FormControl('', [Validators.required]),
    state: new FormControl(''),
    city: new FormControl(''),
  })

  eventDateForm = new FormGroup({
    year: new FormControl(0, [Validators.required]),
    month: new FormControl(0),
    day: new FormControl(0),
    is_ad: new FormControl(true),
    modifier: new FormControl(''),
  })

  constructor(
    private locationService: LocationService,
    private eventDateService: EventDateService
  ) {}

  openLocationDialog() {
    (this.locationDialog.nativeElement as HTMLDialogElement).showModal();
  }
  openStartDateDialog() {
    (this.startDateDialog.nativeElement as HTMLDialogElement).showModal();
  }
  openEndDateDialog() {
    (this.endDateDialog.nativeElement as HTMLDialogElement).showModal();
  }
  openEventDateDialog() {
    (this.eventDateDialog.nativeElement as HTMLDialogElement).showModal();
  }

  closeDialog() {
    this.locationForm.reset();
    (this.locationDialog.nativeElement as HTMLDialogElement).close();
  }

  locationSubmit(): number | void {
    this.locationService.createLocation(this.locationForm.value).subscribe({
      next: (res) => {
        this.locationID.emit(res.id);
      }
    });
    this.locationForm.reset();
  }

  startDateSubmit() {
    this.eventDateService.createEventDate(this.eventDateForm.value).subscribe({
      next: (res) => {
        this.startDateID.emit(res.id);
      }
    });
    this.eventDateForm.reset({
      is_ad: true
    });
  }
  endDateSubmit() {
    this.eventDateService.createEventDate(this.eventDateForm.value).subscribe({
      next: (res) => {
        this.endDateID.emit(res.id);
      }
    });
    this.eventDateForm.reset({
      is_ad: true
    });
  }
  eventDateSubmit() {
    this.eventDateService.createEventDate(this.eventDateForm.value).subscribe({
      next: (res) => {
        this.eventDateID.emit(res.id);
      }
    });
    this.eventDateForm.reset({
      is_ad: true
    });
  }

}
