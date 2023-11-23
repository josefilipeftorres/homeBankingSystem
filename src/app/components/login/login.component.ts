import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private apiService: ApiService) { }

  login(email: string, password: string) {
    this.apiService.loginUser({ email, password })
      .subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          // TODO: save the token to local storage and redirect to the dashboard
        },
        error: (error) => {
          console.error('Login failed:', error);
          // TODO: display an error message
        },
      });
  }
}
