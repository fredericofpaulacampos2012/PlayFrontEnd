import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalColaboratorComponent } from './modal-colaborator.component';

describe('ModalColaboratorComponent', () => {
  let component: ModalColaboratorComponent;
  let fixture: ComponentFixture<ModalColaboratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalColaboratorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalColaboratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
