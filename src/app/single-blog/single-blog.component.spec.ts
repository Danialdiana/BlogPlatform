import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { SingleBlogComponent } from './single-blog.component';
import { BlogService } from '../blog.service';
import { CommentService } from '../comment.service';
import { UserService } from '../user.service';

describe('SingleBlogComponent', () => {
  let component: SingleBlogComponent;
  let fixture: ComponentFixture<SingleBlogComponent>;
  let mockActivatedRoute: { params: any };
  let mockRouter: { navigate: jasmine.Spy };
  let mockBlogService: jasmine.SpyObj<BlogService>;
  let mockCommentService: jasmine.SpyObj<CommentService>;
  let mockUserService: jasmine.SpyObj<UserService>;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    mockActivatedRoute = {
      params: of({ id: 'some-blog-id' })
    };
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockBlogService = jasmine.createSpyObj('BlogService', ['getBlogById', 'deleteBlog']);
    mockCommentService = jasmine.createSpyObj('CommentService', ['getCommentsByBlogId', 'deleteComment']);
    mockUserService = jasmine.createSpyObj('UserService', ['getCurrentUser']);
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      declarations: [SingleBlogComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
        { provide: BlogService, useValue: mockBlogService },
        { provide: CommentService, useValue: mockCommentService },
        { provide: UserService, useValue: mockUserService },
        { provide: MatSnackBar, useValue: mockSnackBar },
        FormBuilder,
      ],
    });

    fixture = TestBed.createComponent(SingleBlogComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



});



