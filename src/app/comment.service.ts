import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private serverUrl = 'http://localhost:3000'; // URL вашего сервера 
 
  constructor(private  http: HttpClient, private userService: UserService) { } 
 
  createComment(blog: string, content: string, user: string):Observable<any> { 
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.userService.getToken()}`
    });
    
 
    const body = { content, blog, user }; 
 
    return this.http.post<any>(`${this.serverUrl}/blogs/${blog}/comments`, body, { headers }); 
  }

  getCommentsByBlogId(blog: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.serverUrl}/blogs/${blog}/comments`
  );}

  updateComment(commentId: string, content: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.userService.getToken()}`
    });

    const body = { content };

    return this.http.put<any>(`${this.serverUrl}/comments/${commentId}`, body, { headers });
  }

  deleteComment(commentId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userService.getToken()}`
    });

    return this.http.delete<any>(`${this.serverUrl}/comments/${commentId}`, { headers });
  }

}
