import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StartupService } from '../startup.service';
import { CommentService } from '../comment.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../user.module';
import { UserService } from '../user.service';

@Component({
  selector: 'app-single-startup',
  templateUrl: './singlestartup.component.html',
  styleUrls: ['./singlestartup.component.css']
})
export class SinglestartupComponent implements OnInit {
  startup: any;
  userId: User | null = null;
  user = '';

  showDeleteConfirmation: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private startupService: StartupService,
    private commentService: CommentService,
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: UserService
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const startupId = params['id'];
      this.getStartupById(startupId);
      this.getCurrentUser();
    });
  }

  getStartupById(id: string): void {
    this.startupService.getStartupById(id).subscribe(startup => {
      this.startup = startup;
    });
  }

  getCurrentUser(): void {
    this.authService.getCurrentUser().subscribe(
      (currentUser: User) => {
        if (currentUser && currentUser._id) {
          this.user = currentUser._id;
          console.log('Current user:', currentUser);
        }
      },
      (error) => {
        console.error('Error fetching current user:', error);
      }
    );
  }

  deleteStartup(): void {
    const isConfirmed = window.confirm('Вы уверены, что хотите удалить этот стартап?');
    if (isConfirmed) {
      this.startupService.deleteStartup(this.startup?._id).subscribe(
        () => {
          console.log('Стартап успешно удален');
          this.router.navigate(['/main']);  
        },
        error => {
          console.error('Ошибка при удалении стартапа:', error);
        }
      );
    }
  }
  

  confirmDeleteStartup(): void {
    this.startupService.deleteStartup(this.startup?._id).subscribe(
      () => {
        console.log('Startup deleted successfully');
        this.router.navigate(['/startups']); 
      },
      error => {
        console.error('Error deleting startup:', error);
      }
    );
    this.showDeleteConfirmation = false;
  }

  cancelDeleteStartup(): void {
    this.showDeleteConfirmation = false;
  }


  goToUpdateStartup(id: string): void {
    this.router.navigate(['/startups/update', id]);
  }
}
