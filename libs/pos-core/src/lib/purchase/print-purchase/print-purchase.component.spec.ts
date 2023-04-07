import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintPurchaseComponent } from './print-purchase.component';

describe('PrintPurchaseComponent', () => {
  let component: PrintPurchaseComponent;
  let fixture: ComponentFixture<PrintPurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintPurchaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
