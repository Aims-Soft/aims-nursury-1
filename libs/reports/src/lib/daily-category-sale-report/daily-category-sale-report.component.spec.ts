import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyCategorySaleReportComponent } from './daily-category-sale-report.component';

describe('DailyCategorySaleReportComponent', () => {
  let component: DailyCategorySaleReportComponent;
  let fixture: ComponentFixture<DailyCategorySaleReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyCategorySaleReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyCategorySaleReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
