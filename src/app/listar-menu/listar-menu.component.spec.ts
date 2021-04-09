import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarMenuComponent } from './listar-menu.component';

describe('ListarMenuComponent', () => {
  let component: ListarMenuComponent;
  let fixture: ComponentFixture<ListarMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
