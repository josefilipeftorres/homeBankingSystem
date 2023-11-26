import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly API_URL = 'http://localhost:3000';

  constructor(
    private http: HttpClient
  ) { }

  // User registration
  registerUser(user: any): Observable<any> {
    return this.http.post(`${this.API_URL}/subscribe`, user);
  }

  // User login
  loginUser(user: any): Observable<any> {
    return this.http.post(`${this.API_URL}/login`, user);
  }

  // Get Info of the logged in user
  getUserInfo(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.get(`${this.API_URL}/user`, { headers });
  }
}
