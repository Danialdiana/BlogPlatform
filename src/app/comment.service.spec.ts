import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CommentService } from './comment.service';
import { UserService } from './user.service';

describe('CommentService', () => {
  let commentService: CommentService;
  let httpTestingController: HttpTestingController;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CommentService, UserService]
    });

    commentService = TestBed.inject(CommentService);
    httpTestingController = TestBed.inject(HttpTestingController);
    userService = TestBed.inject(UserService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(commentService).toBeTruthy();
  });

  it('should create a comment', () => {
    const blogId = 'someBlogId';
    const content = 'Test comment content';

    commentService.createComment(blogId, content, 'someUserId').subscribe();

    const req = httpTestingController.expectOne(`${commentService['serverUrl']}/blogs/${blogId}/comments`);
    expect(req.request.method).toBe('POST');
    req.flush({}); // Simulate a successful response

    // You can add more expectations based on your implementation
  });

  it('should get comments by blog ID', () => {
    const blogId = 'someBlogId';

    commentService.getCommentsByBlogId(blogId).subscribe();

    const req = httpTestingController.expectOne(`${commentService['serverUrl']}/blogs/${blogId}/comments`);
    expect(req.request.method).toBe('GET');
    req.flush([]); // Simulate an empty array of comments

    // You can add more expectations based on your implementation
  });

  // Add tests for updateComment and deleteComment methods similarly
});