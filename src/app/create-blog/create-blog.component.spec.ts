import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { CreateBlogComponent } from './create-blog.component';
import { FormBuilder } from '@angular/forms';
import { BlogService } from '../blog.service';
import { UserService } from '../user.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CreateBlogComponent', () => {
  let component: CreateBlogComponent;
  let fixture: ComponentFixture<CreateBlogComponent>;
  let mockBlogService: jasmine.SpyObj<BlogService>;
  let mockUserService: jasmine.SpyObj<UserService>;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    mockBlogService = jasmine.createSpyObj('BlogService', ['createBlog']);
    mockUserService = jasmine.createSpyObj('UserService', ['getCurrentUser']);
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      declarations: [CreateBlogComponent],
      imports: [MatSnackBarModule, BrowserAnimationsModule],
      providers: [
        { provide: BlogService, useValue: mockBlogService },
        { provide: UserService, useValue: mockUserService },
        { provide: MatSnackBar, useValue: mockSnackBar },
        FormBuilder
      ]
    });

    fixture = TestBed.createComponent(CreateBlogComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get current user on initialization', () => {
    const mockUser = { _id: 'user-id', username: 'testuser', email: 'test@example.com', password: 'password123' };
    mockUserService.getCurrentUser.and.returnValue(of(mockUser));

    component.ngOnInit();

    expect(component.currentUser).toEqual(mockUser);
  });


  it('should set selectedFile when onFileSelected is called with a valid file', () => {
    const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    const event = { target: { files: [mockFile] } };

    component.onFileSelected(event);

    expect(component.selectedFile).toEqual(mockFile);
  });

  it('should not set selectedFile when onFileSelected is called without a valid file', () => {
    const event = { target: { files: [] } };

    component.onFileSelected(event);

    expect(component.selectedFile).toBeUndefined();
  });

  it('should call createBlog method of BlogService when submitBlog is called with valid data', fakeAsync(() => {
    const mockUser = { _id: 'user-id', username: 'testuser', email: 'test@example.com', password: 'password123' };
    component.currentUser = mockUser;

    const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    component.selectedFile = mockFile;

    const mockBlogData = { title: 'Test Blog', content: 'Test Content', userId: 'user-id' };
    const mockResponse = { message: 'Blog created successfully' };
    mockBlogService.createBlog.and.returnValue(of(mockResponse));

    component.blogForm.setValue({ title: mockBlogData.title, content: mockBlogData.content });
    component.submitBlog();
    tick();

    expect(mockBlogService.createBlog).toHaveBeenCalledWith(
      mockBlogData.title,
      mockBlogData.content,
      mockFile,
      mockUser._id
    );
  }));


  it('should display error message if blogForm is invalid when submitting blog', fakeAsync(() => {
    component.blogForm.setValue({ title: '', content: '' });

    component.submitBlog();
    tick();

    expect(mockSnackBar.open).toHaveBeenCalledWith('Форма недействительна. Заполните все обязательные поля.', 'Закрыть');
  }));
});