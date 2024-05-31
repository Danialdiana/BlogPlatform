import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStartupComponent } from './create-startup.component';

describe('CreateStartupComponent', () => {
  let component: CreateStartupComponent;
  let fixture: ComponentFixture<CreateStartupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateStartupComponent]
    });
    fixture = TestBed.createComponent(CreateStartupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
