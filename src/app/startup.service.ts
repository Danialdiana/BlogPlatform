import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StartupService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  createStartup(startup: any): Observable<any> {
    const token = localStorage.getItem('token'); // Get JWT token from localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`) // Set Authorization header

    return this.http.post<any>(`${this.apiUrl}/startups`, startup, { headers }); // Send request with headers
  }

  getStartups(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/startups`);
  }

  searchStartups(query: string): Observable<any[]> {
    const params = new HttpParams().set('q', query);
    return this.http.get<any[]>(`${this.apiUrl}/startups/search`, { params });
  }

  getStartupById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/startups/${id}`);
  }

  deleteStartup(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/startups/${id}`);
  }

  updateStartup(id: string, updatedData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/startups/${id}`, updatedData);
  }

  getInvestors(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/investors`);
  }
  
}
