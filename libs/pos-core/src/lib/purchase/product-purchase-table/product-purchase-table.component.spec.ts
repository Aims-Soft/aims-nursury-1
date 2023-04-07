import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPurchaseTableComponent } from './product-purchase-table.component';

describe('ProductPurchaseTableComponent', () => {
  let component: ProductPurchaseTableComponent;
  let fixture: ComponentFixture<ProductPurchaseTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductPurchaseTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPurchaseTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
