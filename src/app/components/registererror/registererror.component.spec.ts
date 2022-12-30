import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistererrorComponent } from './registererror.component';

describe('RegistererrorComponent', () => {
  let component: RegistererrorComponent;
  let fixture: ComponentFixture<RegistererrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistererrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistererrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
