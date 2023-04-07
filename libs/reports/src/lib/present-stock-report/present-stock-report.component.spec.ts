import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentStockReportComponent } from './present-stock-report.component';

describe('PresentStockReportComponent', () => {
  let component: PresentStockReportComponent;
  let fixture: ComponentFixture<PresentStockReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresentStockReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentStockReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
