import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage = '';
  errorCode = '';
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log(response);
          localStorage.setItem('authToken', response.data.accessToken);
          if (response) this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.log(error);
          this.errorCode = error?.error?.errorCode;
          this.errorMessage = error?.error?.message;
        },
      });
    }
  }
}
