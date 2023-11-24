import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }
  ngOnInit() {
    console.log('AppComponent initialized');

    // Check if the user is already logged in
    const storedToken = localStorage.getItem('token');

    if (storedToken) {
      // Token is present, user is logged in
      this.router.navigate(['/dashboard']);
    } else {
      // Token is not present, user is not logged in
      this.router.navigate(['/login']);
    }
  }
}
