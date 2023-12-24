import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { User } from './user.module';
import { of } from 'rxjs';

describe('UserService', () => {
  let userService: UserService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });

    userService = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });
  

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(userService).toBeTruthy();
  });

  it('should register a user', () => {
    const user: User = {
      _id: '1',
      username: 'john_doe',
      email: 'john.doe@example.com',
      password: '123456'
      // Дополнительные поля вашего объекта User...
    };

    userService.registerUser(user).subscribe(response => {
      // You can add expectations based on your API response
    });

    const req = httpTestingController.expectOne(`${userService.baseURL}register`);
    expect(req.request.method).toEqual('POST');
    req.flush({ /* your mock response data here */ });
  });

  it('should login a user', () => {
    const credentials = { email: 'test@example.com', password: 'password' };

    userService.loginUser(credentials).subscribe(response => {
      // You can add expectations based on your API response
    });

    const req = httpTestingController.expectOne(`${userService.baseURL}login`);
    expect(req.request.method).toEqual('POST');
    req.flush({ token: 'mockToken' }); // Mocking the response with a token
  });

  const mockUserService = jasmine.createSpyObj('UserService', [
    'getCurrentUser'
  ]);
  
  // Добавляем тип User к mockUserService
  const mockUser: User = {
    _id: 'user-id',
    username: 'testuser',
    email: 'test@example.com',
    password: 'password123'
  };
  
  mockUserService.getCurrentUser.and.returnValue(of(mockUser));
  // Add more tests for other methods as needed
});