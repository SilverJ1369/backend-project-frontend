import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalService } from '../../core/servies/modal.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnInit, OnDestroy{

  showModal = false;
  private subscription!: Subscription;

  constructor(private modalService: ModalService) {}

  ngOnInit() {
    this.subscription = this.modalService.showModal$.subscribe(show => {
      this.showModal = show;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
