import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Admin } from '../../shared/models/admin';
import { SidebarService } from './sidebar.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly tokenSubject = new BehaviorSubject<string | null>(null);

  constructor(
    private http: HttpClient,
    private router: Router,
    private sidebarService: SidebarService) { }

  login(username: string, password: string) {
    return this.http.post<{token: string}>(`${environment.apiUrl}/login`, {
      username,
      password
    });
  }

  signUp(admin: Admin) {
    return this.http.post(`${environment.apiUrl}/admins`, {
      admin: admin
    });
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
    this.tokenSubject.next(token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  logout() {
    this.sidebarService.sidebarOpened.next(false);
    localStorage.removeItem('token');
    this.tokenSubject.next(null);
    this.router.navigate(['/login']);
  }
}
