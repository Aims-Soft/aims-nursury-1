import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyInvoiceReportComponent } from './daily-invoice-report.component';

describe('DailyInvoiceReportComponent', () => {
  let component: DailyInvoiceReportComponent;
  let fixture: ComponentFixture<DailyInvoiceReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyInvoiceReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyInvoiceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
