import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { User } from './user.module';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly baseURL = 'http://localhost:3000/';

  constructor(private http: HttpClient,private router: Router) { }

  registerUser(user: User): Observable<any> {
    const registerURL = this.baseURL + 'register'; 
    return this.http.post(registerURL, user);
  }

  loginUser(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.baseURL}login`, credentials).pipe(
      tap(data => this.saveToken(data.token))
    );
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token); 
  }

  getToken(): string | null {
    return localStorage.getItem('token'); 
  }
  getUsers(): Observable<any[]> {
    const getUsersURL = `${this.baseURL}/users`; 
    return this.http.get<any[]>(getUsersURL);
  }

  getCurrentUser(): Observable<User> {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token found');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(`${this.baseURL}current-user`, { headers }).pipe(
      map((response: any) => {
        const currentUser = response?.user;
        if (currentUser) {
          return currentUser; 
        }
        throw new Error('User not found');
      })
    );
  }

  isUserLoggedIn(): boolean {
    const token = this.getToken();
    return !!token; 
  }

  logout(): void {
    localStorage.removeItem('token'); 
    this.router.navigate(['/register']);
  }

}
