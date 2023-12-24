import { Component, OnInit } from '@angular/core';
import { BlogService } from '../blog.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';


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

  constructor(private blogService: BlogService,private router: Router,private userService: UserService) { }

  ngOnInit(): void {
    this.getBlogList();
  }
  
  getBlogList(): void {
    this.blogService.getBlogs()
      .subscribe(data => {
        this.blogs = data; // Заполнение массива блог-постов, полученных из сервиса
      });
  }

  getUserList(): void {
    this.userService.getUsers().subscribe(
      (users: any[]) => {
        this.users = users; // Заполнение массива this.users полученными данными о пользователях
      },
      (error) => {
        console.error('Ошибка при получении списка пользователей:', error);
        // Обработка ошибок при получении списка пользователей
      }
    );
  }

  getUserName(userId: string): string {
    const foundUser = this.users.find(user => user._id === userId);
    return foundUser ? foundUser.name : 'Unknown'; // Если пользователя не найдено, выводим 'Unknown'
  }



  goToSingleBlog(id: string) {
    this.router.navigate(['/blogs', id]);
  }

  onSearchInputChange(): void {
    // При изменении ввода выполняем поиск и обновляем результаты
    this.applySearch();
  }

  applySearch(): void {
    // Применяем фильтр на основе поискового запроса
    this.filteredBlogs = this.blogs.filter(blog =>
      blog.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      blog.content.toLowerCase().includes(this.searchQuery.toLowerCase())
    );

    // Устанавливаем флаг активации поиска
    this.isSearchActive = this.searchQuery.length > 0;
  }

  
}
