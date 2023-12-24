// search-bar.component.ts
import { Component } from '@angular/core';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  searchTerm: string = '';

  constructor(private blogService: BlogService) {}

  searchPost(): void {
    this.blogService.searchPostByTitle(this.searchTerm).subscribe((result) => {
      // Обработка результатов поиска, например, отображение найденных постов
      console.log('Результаты поиска:', result);
      // Далее можете сохранить результаты поиска для отображения в компоненте списка постов
    }, (error) => {
      console.error('Ошибка при поиске поста:', error);
    });
  }
}
