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
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signupForm: FormGroup;
  errorMessage = '';
  errorCode = '';
  passwordVisible = false;
  userNameError = '';
  roleError = '';
  passwordError = '';
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
  ) {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required],
      profilePicture: [null],
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const formData = new FormData();
      formData.append('username', this.signupForm.value.username);
      formData.append('email', this.signupForm.value.email);
      formData.append('password', this.signupForm.value.password);
      formData.append('role', this.signupForm.value.role);
      formData.append('profilePicture', this.signupForm.value.profilePicture);

      this.authService.register(formData).subscribe({
        next: (response) => {
          console.log(response);

          // Show dynamic success toast
          this.spinner.hide();
          this.toastr.success('Signup successful! You can now log in.', 'Success', {
            timeOut: 3000,
            progressBar: true,
            closeButton: true,
          });

          // Optionally navigate after small timeout if you want smoother UX
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1000);
        },
        error: (error) => {
          this.errorCode = error?.error?.errorCode;
          this.errorMessage = error?.error?.message;

          // Handle validation errors specifically
          if (error?.error?.errors) {
            const fieldErrors = error?.error?.errors;
            for (const fieldError of fieldErrors) {
              console.log(fieldError);
              switch (fieldError.field) {
                case 'username':
                  console.log(fieldError.message);
                  this.userNameError = fieldError.message;
                  break;
                case 'password':
                  this.passwordError = fieldError.message;
                  break;
                default:
                  console.warn('Unhandled field error:', fieldError);
              }
              console.log(fieldError?.field);
            }
          }
        },
      });
    }
  }
  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement; // Cast event target to HTMLInputElement
    if (input?.files?.length) {
      const file = input.files[0];
      this.signupForm.patchValue({
        profilePicture: file,
      });
    }
  }
}
