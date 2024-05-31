import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../blog.service';
import { CommentService } from '../comment.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../user.module';
import { UserService } from '../user.service';

@Component({
  selector: 'app-single-blog',
  templateUrl: './single-blog.component.html',
  styleUrls: ['./single-blog.component.css']
})
export class SingleBlogComponent implements OnInit {
 
  blog: any;
  commentForm!: FormGroup;
  content: string = '';
  user: string = '';

  comments: any[] = [];
  userId: User | null = null;

  editingCommentId: string | null = null;
  editingCommentContent: string = '';
  showDeleteConfirmation: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private commentService: CommentService,
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: UserService
  ) {
    this.commentForm = this.formBuilder.group({
      content: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const blogId = params['id'];
      this.getBlogById(blogId);
      this.getCommentsByBlogId(blogId);
      this.getCurrentUser();
    });
  }

  getBlogById(id: string): void {
    this.blogService.getBlogById(id).subscribe(blog => {
      this.blog = blog;
    });
  }

  getCommentsByBlogId(blogId: string): void {
    this.commentService.getCommentsByBlogId(blogId).subscribe(comments => {
      this.comments = comments;
    });
  }

  getCurrentUser(): void {
    this.authService.getCurrentUser().subscribe(
      (currentUser: User) => {
        if (currentUser && currentUser._id) {
          this.user = currentUser._id;
          console.log('Текущий пользователь:', currentUser);
        }
      },
      (error) => {
        console.error('Ошибка при получении информации о текущем пользователе:', error);
      }
    );
  }

  onSubmitComment() {
    if (this.commentForm.valid && this.user) {
      const content = this.commentForm.value.content;
      const blog = this.blog._id;
      const user = this.user;

      if (this.editingCommentId) {
        this.editComment(this.editingCommentId, content);
      } else {
        this.createComment(blog, content, user);
      }

      this.editingCommentId = null;
      this.editingCommentContent = '';

      this.commentForm.reset();
    }
  }

  createComment(blog: string, content: string, user: string): void {
    this.commentService.createComment(blog, content, user).subscribe(
      newComment => {
        console.log('Комментарий успешно добавлен:', newComment);
        this.getCommentsByBlogId(blog); 
      },
      error => {
        console.error('Ошибка при добавлении комментария:', error);
      }
    );
  }

  editComment(commentId: string, content: string): void {
    this.commentService.updateComment(commentId, content).subscribe(
      updatedComment => {
        console.log('Комментарий успешно отредактирован:', updatedComment);
        this.getCommentsByBlogId(this.blog._id); 
      },
      error => {
        console.error('Ошибка при редактировании комментария:', error);
      }
    );
  }

  fillEditCommentForm(commentId: string, content: string): void {
    this.editingCommentId = commentId;
    this.editingCommentContent = content;
    this.commentForm.patchValue({ content });
  }
  cancelEditComment(): void {
    this.editingCommentId = null;
    this.editingCommentContent = '';
    this.commentForm.reset();
  }
deleteComment(commentId: string): void {
  if (confirm('Вы уверены, что хотите удалить этот комментарий?')) {
    this.commentService.deleteComment(commentId).subscribe(
      () => {
        console.log('Комментарий успешно удален');
        this.getCommentsByBlogId(this.blog?._id);
      },
      error => {
        console.error('Ошибка при удалении комментария:', error);
      }
    );
  }
}

deleteBlog(): void {
  const isConfirmed = window.confirm('Вы уверены, что хотите удалить этот блог?');
  if (isConfirmed) {
    this.blogService.deleteBlog(this.blog?._id).subscribe(
      () => {
        console.log('Блог успешно удален');
        this.router.navigate(['/main']);  
      },
      error => {
        console.error('Ошибка при удалении блога:', error);
      }
    );
  }
}

confirmDeleteBlog(): void {
  this.blogService.deleteBlog(this.blog?._id).subscribe(
    () => {
      console.log('Блог успешно удален');
      this.router.navigate(['/blogs']); 
    },
    error => {
      console.error('Ошибка при удалении блога:', error);
    }
  );
  this.showDeleteConfirmation = false;
}

cancelDeleteBlog(): void {
  this.showDeleteConfirmation = false;
}

  isEditingComment(commentId: string): boolean {
    return this.editingCommentId === commentId;
  }


  


  goToUpdateBlog(id: string): void {
    this.router.navigate(['/blogs/update', id]);
  }
}