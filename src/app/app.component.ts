import { Component , OnInit} from '@angular/core';
import { UserService } from '../app/user.service';
import { FactServiceService } from '../app/fact-service.service';
import { HttpErrorResponse } from '@angular/common/http';

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
    return this.authService.isUserLoggedIn(); 
  }

  logout(): void {
    this.authService.logout();
  }

  title = 'OiBolisApp';


}
