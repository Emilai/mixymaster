import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrongpayComponent } from './wrongpay.component';

describe('WrongpayComponent', () => {
  let component: WrongpayComponent;
  let fixture: ComponentFixture<WrongpayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrongpayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WrongpayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
