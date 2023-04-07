import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodicCategorySaleReportComponent } from './periodic-category-sale-report.component';

describe('PeriodicCategorySaleReportComponent', () => {
  let component: PeriodicCategorySaleReportComponent;
  let fixture: ComponentFixture<PeriodicCategorySaleReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeriodicCategorySaleReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodicCategorySaleReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
