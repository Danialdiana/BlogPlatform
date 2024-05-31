import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';

import { ListBlogComponent } from './list-blog.component';
import { BlogService } from '../blog.service';
import { UserService } from '../user.service';

describe('ListBlogComponent', () => {
  let component: ListBlogComponent;
  let fixture: ComponentFixture<ListBlogComponent>;
  let blogServiceSpy: jasmine.SpyObj<BlogService>;
  let userServiceSpy: jasmine.SpyObj<UserService>;

  beforeEach(() => {
    const blogServiceSpyObj = jasmine.createSpyObj('BlogService', ['getBlogs']);
    const userServiceSpyObj = jasmine.createSpyObj('UserService', ['getUsers']);

    TestBed.configureTestingModule({
      declarations: [ListBlogComponent],
      providers: [
        { provide: BlogService, useValue: blogServiceSpyObj },
        { provide: UserService, useValue: userServiceSpyObj }
      ]
    });

    fixture = TestBed.createComponent(ListBlogComponent);
    component = fixture.componentInstance;

    blogServiceSpy = TestBed.inject(BlogService) as jasmine.SpyObj<BlogService>;
    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
