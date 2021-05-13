import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalCocinaComponent } from './personal-cocina.component';

describe('PersonalCocinaComponent', () => {
  let component: PersonalCocinaComponent;
  let fixture: ComponentFixture<PersonalCocinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalCocinaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalCocinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
