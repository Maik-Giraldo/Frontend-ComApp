import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarMenuComponent } from './editar-menu.component';

describe('EditarMenuComponent', () => {
  let component: EditarMenuComponent;
  let fixture: ComponentFixture<EditarMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
