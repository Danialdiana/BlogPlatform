import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { ActivatedRoute,Router } from '@angular/router';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  loginForm: FormGroup;
  errorMessage!: string;
  password: string = '';

  constructor(private authService: UserService,private router: Router,) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      // Используем объект credentials, содержащий email и password
      const credentials = { email, password };
      
      this.authService.loginUser(credentials).subscribe(
        (response) => {
          // Обработка успешного входа
          console.log('Logged in successfully!', response);
          // Дополнительная логика после успешного входа, например, перенаправление на другую страницу
          this.router.navigate(['/main']); // Перенаправление на страницу main
        },
        (error) => {
          // Обработка ошибок аутентификации
          console.error('Login failed:', error);
          this.errorMessage = 'Invalid email or password. Please try again.';
        }
      );
    }
  }
}
