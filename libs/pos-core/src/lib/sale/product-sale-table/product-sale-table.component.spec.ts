import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSaleTableComponent } from './product-sale-table.component';

describe('ProductSaleTableComponent', () => {
  let component: ProductSaleTableComponent;
  let fixture: ComponentFixture<ProductSaleTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductSaleTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSaleTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
