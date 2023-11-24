import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  title: string = 'Welcome to the Home Banking App';
  message: string = '';

  signUpForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl('', Validators.email),
    password: new FormControl(''),
  });

  constructor(
    private apiService: ApiService,
    private router: Router,
  ) { }

  onSubmit() {
    this.message = '';

    if (this.signUpForm.invalid) {
      this.message = 'Please fill in all the fields';
      return;
    }

    const { name, email, password } = this.signUpForm.value;
    this.signup(name, email, password);
  }

  signup(name: string, email: string, password: string) {
    this.apiService.registerUser({ name, email, password })
      .subscribe({
        next: (response) => {
          console.log('Signup successful:', response);
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Signup failed:', error);
          const errorMessage = error.error.message;
          this.message = `Signup failed: ${errorMessage}`;
        },
      });
  }
}
