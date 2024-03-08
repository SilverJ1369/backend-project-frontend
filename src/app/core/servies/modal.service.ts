import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private _showModal = new BehaviorSubject<boolean>(false);
  showModal$ = this._showModal.asObservable();

  constructor() { }
  
  openModal() {
    this._showModal.next(true);
  }

  closeModal() {
    this._showModal.next(false);
  }
}
