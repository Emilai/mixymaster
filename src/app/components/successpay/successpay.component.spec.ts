import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccesspayComponent } from './successpay.component';

describe('SuccesspayComponent', () => {
  let component: SuccesspayComponent;
  let fixture: ComponentFixture<SuccesspayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccesspayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccesspayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
