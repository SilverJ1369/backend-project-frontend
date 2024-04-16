import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Admin } from '../../../shared/models/admin';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signUpForm: FormGroup;

  constructor(private authService: AuthService) {
    this.signUpForm = new FormGroup({
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      password_confirmation: new FormControl('', Validators.required)
    });
   }

  signUp() {
    const signUpAdmin: Admin = this.signUpForm.value;

    this.authService.signUp(signUpAdmin).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }


}
