import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintSaleComponent } from './print-sale.component';

describe('PrintSaleComponent', () => {
  let component: PrintSaleComponent;
  let fixture: ComponentFixture<PrintSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintSaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
