import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private serverUrl = 'http://localhost:3000'; // URL вашего сервера

  constructor(private http: HttpClient) { }

  createBlog(title: string, content: string, image: File, user: string): Observable<any> {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('user', user);
    formData.append('image', image); // Add image with its name
  
    return this.http.post<any>(`${this.serverUrl}/blogs`, formData);
  }
  

  getBlogs(): Observable<any> {
    return this.http.get<any[]>(`${this.serverUrl}/blogs`);
  }

  getBlogById(id: string): Observable<any> {
    return this.http.get<any>(`${this.serverUrl}/blogs/${id}`);
  }

  updateBlog(id: string, updatedData: any): Observable<any> {
    return this.http.put<any>(`${this.serverUrl}/blogs/${id}`, updatedData);
  }

  deleteBlog(id: string): Observable<any> {
    return this.http.delete<any>(`${this.serverUrl}/blogs/${id}`);
  }
  
  searchBlogs(query: string): Observable<any[]> {
    const params = new HttpParams().set('q', query);
    return this.http.get<any[]>(`${this.serverUrl}/blogs`, { params });
  }
  
}
