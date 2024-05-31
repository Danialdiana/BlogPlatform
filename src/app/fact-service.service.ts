import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FactServiceService {
  private apiUrl = 'http://localhost:3000/api/facts';

  constructor(private http: HttpClient) {}

  getFacts(limit: number): Observable<any> {
    return this.http.get(`${this.apiUrl}?limit=${limit}`);
  }
}
