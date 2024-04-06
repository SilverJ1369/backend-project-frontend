import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { SidebarService } from '../../../core/services/sidebar.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private sidebarService: SidebarService) {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
   }

  ngOnInit() {
    this.sidebarService.sidebarOpened.next(false);
  }
  
   login() {
    console.log('Logging in');
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe({
        next: (res: any) => {
          console.log('Logged in', res);

          this.authService.setToken(res.token);
          this.router.navigate(['/']);
        },
        error: (err: any) => {
          console.error(err);
        }
      })
    }
   }
}
