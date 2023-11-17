import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalproductionComponent } from './modalproduction.component';

describe('ModalproductionComponent', () => {
  let component: ModalproductionComponent;
  let fixture: ComponentFixture<ModalproductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalproductionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalproductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
