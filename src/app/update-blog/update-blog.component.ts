import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-update-blog',
  templateUrl: './update-blog.component.html',
  styleUrls: ['./update-blog.component.css']
})
export class UpdateBlogComponent implements OnInit {
  blogId!: string;
  updatedBlogData: any = {}; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.blogId = params['id'];
      this.blogService.getBlogById(this.blogId).subscribe(blog => {
        this.updatedBlogData = blog;
      });
    });
  }

  updateBlog(): void {
    this.blogService.updateBlog(this.blogId, this.updatedBlogData).subscribe(() => {
      this.router.navigate(['/blogs', this.blogId]);
    });
  }
}
