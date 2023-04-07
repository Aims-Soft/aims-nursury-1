import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCategoryTableComponent } from './sub-category-table.component';

describe('SubCategoryTableComponent', () => {
  let component: SubCategoryTableComponent;
  let fixture: ComponentFixture<SubCategoryTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubCategoryTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubCategoryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
