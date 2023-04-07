import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodicSaleReportComponent } from './periodic-sale-report.component';

describe('PeriodicSaleReportComponent', () => {
  let component: PeriodicSaleReportComponent;
  let fixture: ComponentFixture<PeriodicSaleReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeriodicSaleReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodicSaleReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
