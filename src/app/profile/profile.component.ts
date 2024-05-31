import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any; 

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadCurrentUser();
  }

  loadCurrentUser(): void {
    this.userService.getCurrentUser().subscribe(
      (user: any) => {
        this.currentUser = user;
      },
      (error: any) => {
        console.error('Error loading current user:', error);
      }
    );
  }
}
