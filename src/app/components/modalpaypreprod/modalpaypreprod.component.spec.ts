import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalpaypreprodComponent } from './modalpaypreprod.component';

describe('ModalpaypreprodComponent', () => {
  let component: ModalpaypreprodComponent;
  let fixture: ComponentFixture<ModalpaypreprodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalpaypreprodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalpaypreprodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
