import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogService } from '../blog.service';
import { UserService } from '../user.service';
import { User } from '../user.module';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css']
})
export class CreateBlogComponent implements OnInit {
  blogForm: FormGroup;
  selectedFile: File | undefined; // Initialize selectedFile as undefined

  currentUser: User | null = null; // Initialize currentUser as null

  constructor(
    private formBuilder: FormBuilder,
    private blogService: BlogService,
    private authService: UserService,
    private snackBar: MatSnackBar
  ) {
    this.blogForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.getCurrentUser(); // Call the method to get current user info
  }


  getCurrentUser(): void {
    this.authService.getCurrentUser().subscribe(
      (user: User) => {
        if (user) {
          this.currentUser = user; // Assign the user object to currentUser
          console.log('Текущий пользователь:', user);
          // Additional actions with the current user after successful retrieval
        }
      },
      (error) => {
        console.error('Ошибка при получении информации о текущем пользователе:', error);
        // Handling errors while fetching user information
      }
    );
  }

  onFileSelected(event: any): void {
    if (event?.target?.files?.length) {
      this.selectedFile = event.target.files[0] as File;
    }
  }

  submitBlog() {
    if (this.blogForm.valid) {
      const { title, content } = this.blogForm.value;

      if (!this.currentUser) {
        this.snackBar.open('Не удалось получить информацию о текущем пользователе.', 'Закрыть');
        return;
      }

      if (!this.selectedFile) {
        this.snackBar.open('Файл не выбран', 'Закрыть');
        return;
      }

      console.log(this.selectedFile, title, content);

      this.blogService.createBlog(title, content, this.selectedFile, this.currentUser._id).subscribe(
        (response) => {
          this.snackBar.open('Блог успешно опубликован', 'Закрыть', { duration: 3000 });
          // Дополнительная логика после успешной публикации блога
        },
        (error) => {
          this.snackBar.open('Ошибка при публикации блога', 'Закрыть');
          // Дополнительная обработка ошибок
        }
      );
    } else {
      this.snackBar.open('Форма недействительна. Заполните все обязательные поля.', 'Закрыть');
    }
  }
  openSnackBar(message: string): void {
    this.snackBar.open(message, 'Закрыть', { duration: 3000 });
  }
}
