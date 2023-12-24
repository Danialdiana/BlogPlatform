import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateBlogComponent } from './update-blog.component';
import { BlogService } from '../blog.service';
import { of } from 'rxjs';

describe('UpdateBlogComponent', () => {
  let component: UpdateBlogComponent;
  let fixture: ComponentFixture<UpdateBlogComponent>;
  let mockBlogService: jasmine.SpyObj<BlogService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    mockBlogService = jasmine.createSpyObj('BlogService', ['getBlogById', 'updateBlog']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [UpdateBlogComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { params: of({ id: 'some-blog-id' }) } },
        { provide: BlogService, useValue: mockBlogService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateBlogComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch blog data on ngOnInit', () => {
    const blogData = { /* mock your blog data here */ };
    mockBlogService.getBlogById.and.returnValue(of(blogData));

    component.ngOnInit();

    expect(mockBlogService.getBlogById).toHaveBeenCalledWith('some-blog-id');
    expect(component.updatedBlogData).toEqual(blogData);
  });

  it('should update blog and navigate on updateBlog', () => {
    component.blogId = 'some-blog-id';
    mockBlogService.updateBlog.and.returnValue(of({}));

    component.updateBlog();

    expect(mockBlogService.updateBlog).toHaveBeenCalledWith('some-blog-id', component.updatedBlogData);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/blogs', 'some-blog-id']);
  });
});