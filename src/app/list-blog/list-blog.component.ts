import { Component, OnInit } from '@angular/core';
import { BlogService } from '../blog.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { FactServiceService } from '../fact-service.service';
import { DomSanitizer } from '@angular/platform-browser';




@Component({
  selector: 'app-list-blog',
  templateUrl: './list-blog.component.html',
  styleUrls: ['./list-blog.component.css']
})
export class ListBlogComponent implements OnInit {
  searchQuery: string = '';
  filteredBlogs: any[] = [];
  isSearchActive: boolean = false;
    searchResults: any[] = [];
  blogs: any[] = [];
  users: any[] = [];
  imageUrl: any;
  facts: any[] = [];

  constructor(private blogService: BlogService,private router: Router,private userService: UserService,private factService: FactServiceService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getBlogList();
    this.loadFacts(1);
  }
  
  getBlogList(): void {
    this.blogService.getBlogs()
      .subscribe(data => {
        this.blogs = data; 
      });
  }

  getUserList(): void {
    this.userService.getUsers().subscribe(
      (users: any[]) => {
        this.users = users;
      },
      (error) => {
        console.error('Ошибка при получении списка пользователей:', error);
      }
    );
  }

  getUserName(userId: string): string {
    const foundUser = this.users.find(user => user._id === userId);
    return foundUser ? foundUser.name : 'Unknown'; 
  }



  goToSingleBlog(id: string) {
    this.router.navigate(['/blogs', id]);
  }

  onSearchInputChange(): void {
    this.applySearch();
  }

  applySearch(): void {
    this.filteredBlogs = this.blogs.filter(blog =>
      blog.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      blog.content.toLowerCase().includes(this.searchQuery.toLowerCase())
    );

    this.isSearchActive = this.searchQuery.length > 0;
  }

  loadFacts(limit: number) {
    this.factService.getFacts(limit).subscribe(
      data => {
        this.facts = JSON.parse(data); // Преобразование JSON-строки обратно в объект
      },
      error => {
        console.error('Error fetching facts:', error);
      }
      );
    }

  
}
