import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglestartupComponent } from './singlestartup.component';

describe('SinglestartupComponent', () => {
  let component: SinglestartupComponent;
  let fixture: ComponentFixture<SinglestartupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SinglestartupComponent]
    });
    fixture = TestBed.createComponent(SinglestartupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
