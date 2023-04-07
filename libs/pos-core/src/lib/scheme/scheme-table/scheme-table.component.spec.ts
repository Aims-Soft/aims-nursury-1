import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemeTableComponent } from './scheme-table.component';

describe('SchemeTableComponent', () => {
  let component: SchemeTableComponent;
  let fixture: ComponentFixture<SchemeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchemeTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
