import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MandarMenuComponent } from './mandar-menu.component';

describe('MandarMenuComponent', () => {
  let component: MandarMenuComponent;
  let fixture: ComponentFixture<MandarMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MandarMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MandarMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
