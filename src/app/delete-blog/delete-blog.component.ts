import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-delete-blog',
  templateUrl: './delete-blog.component.html',
  styleUrls: ['./delete-blog.component.css']
})
export class DeleteBlogComponent implements OnInit {
  blogId!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.blogId = params['id'];
    });
  }

  deleteBlog(): void {
    this.blogService.deleteBlog(this.blogId).subscribe(() => {
      // После успешного удаления блога перенаправляемся на страницу со списком блогов
      this.router.navigate(['/blogs']);
    });
  }
}
