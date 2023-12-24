import { Component , OnInit} from '@angular/core';
import { UserService } from '../app/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{


  constructor(private authService: UserService) { }

  ngOnInit(): void {
  }

  isLoggedIn(): boolean {
    return this.authService.isUserLoggedIn(); // Метод из вашего AuthService, который проверяет, авторизован ли пользователь
  }

  logout(): void {
    this.authService.logout();
  }

  title = 'OiBolisApp';
}
