import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarService } from '../../core/services/sidebar.service';
import { AuthService } from '../../core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit, OnDestroy{

  sidebarOpenedSub: Subscription = new Subscription();
  sidebarOpened: boolean = false;

  constructor(private sidebarService:SidebarService, public authService: AuthService) { }

  ngOnInit() {
    this.sidebarOpenedSub = this.sidebarService.sidebarOpened.subscribe(opened => {
      this.sidebarOpened = opened;
    });
  }

  ngOnDestroy() {
    this.sidebarOpenedSub.unsubscribe();
  }

}
