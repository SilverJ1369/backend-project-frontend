import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarService } from '../../core/services/sidebar.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{

  sidebarOpened = false;

  constructor(private sidebarService:SidebarService) { }

  ngOnInit() {
    this.sidebarService.sidebarOpened.subscribe(opened => {
      this.sidebarOpened = opened;
      console.log('Sidebar opened:', opened);
      
    });
  }

}
