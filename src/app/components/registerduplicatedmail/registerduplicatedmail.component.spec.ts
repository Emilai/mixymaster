import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterduplicatedmailComponent } from './registerduplicatedmail.component';

describe('RegisterduplicatedmailComponent', () => {
  let component: RegisterduplicatedmailComponent;
  let fixture: ComponentFixture<RegisterduplicatedmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterduplicatedmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterduplicatedmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
