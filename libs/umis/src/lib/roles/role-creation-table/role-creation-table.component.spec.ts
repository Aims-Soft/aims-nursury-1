import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleCreationTableComponent } from './role-creation-table.component';

describe('RoleCreationTableComponent', () => {
  let component: RoleCreationTableComponent;
  let fixture: ComponentFixture<RoleCreationTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleCreationTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleCreationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
