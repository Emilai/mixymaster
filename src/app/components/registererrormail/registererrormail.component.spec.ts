import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistererrormailComponent } from './registererrormail.component';

describe('RegistererrormailComponent', () => {
  let component: RegistererrormailComponent;
  let fixture: ComponentFixture<RegistererrormailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistererrormailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistererrormailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
