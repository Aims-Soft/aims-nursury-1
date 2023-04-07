import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeProfileTableComponent } from './employee-profile-table.component';

describe('EmployeeProfileTableComponent', () => {
  let component: EmployeeProfileTableComponent;
  let fixture: ComponentFixture<EmployeeProfileTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeProfileTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeProfileTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
