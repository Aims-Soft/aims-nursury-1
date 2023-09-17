import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintKotSaleComponent } from './print-kot-sale.component';

describe('PrintKotSaleComponent', () => {
  let component: PrintKotSaleComponent;
  let fixture: ComponentFixture<PrintKotSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintKotSaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintKotSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
