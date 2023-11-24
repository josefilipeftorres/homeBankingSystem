import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  title: string = 'Welcome to the Home Banking App';
  message: string = '';

  logInForm: FormGroup = new FormGroup({
    email: new FormControl('', Validators.email),
    password: new FormControl(''),
  });

  constructor(
    private apiService: ApiService,
    private router: Router,
  ) { }

  onSubmit() {
    this.message = '';

    if (this.logInForm.invalid) {
      this.message = 'Please fill in all the fields';
      return;
    }

    const { email, password } = this.logInForm.value;
    this.login(email, password);
  }

  login(email: string, password: string) {
    this.apiService.loginUser({ email, password })
      .subscribe({
        next: (response) => {
          console.log('Login successful:', response);

          const token = response.token;
          localStorage.setItem('token', token);

          this.router.navigate(['/dashboard']);

        },
        error: (error) => {
          console.error('Login failed:', error);
          const errorMessage = error.error.message;
          this.message = `Login failed: ${errorMessage}`;
        },
      });
  }
}
