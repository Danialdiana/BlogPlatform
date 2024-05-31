import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BlogService } from './blog.service';

describe('BlogService', () => {
  let blogService: BlogService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BlogService]
    });

    blogService = TestBed.inject(BlogService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(blogService).toBeTruthy();
  });

  it('should create a blog', () => {
    const title = 'Test Title';
    const content = 'Test Content';
    const image = new File([''], 'test.jpg', { type: 'image/jpeg' });
    const user = '123'; 

    blogService.createBlog(title, content, image, user).subscribe((response) => {
      expect(response).toBeDefined();
    });

    const req = httpTestingController.expectOne('http://localhost:3000/blogs');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body.get('title')).toEqual(title);
    expect(req.request.body.get('content')).toEqual(content);
    expect(req.request.body.get('user')).toEqual(user);
    expect(req.request.body.get('image')).toEqual(image);
    
    req.flush({}); 
  });

  it('should get blogs', () => {
    const mockBlogs = [{ id: '1', title: 'Blog 1' }, { id: '2', title: 'Blog 2' }];

    blogService.getBlogs().subscribe((blogs) => {
      expect(blogs).toEqual(mockBlogs);
    });

    const req = httpTestingController.expectOne('http://localhost:3000/blogs');
    expect(req.request.method).toEqual('GET');
    
    req.flush(mockBlogs);
  });

});
