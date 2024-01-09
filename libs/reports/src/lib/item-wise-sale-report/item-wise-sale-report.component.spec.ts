import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemWiseSaleReportComponent } from './item-wise-sale-report.component';

describe('ItemWiseSaleReportComponent', () => {
  let component: ItemWiseSaleReportComponent;
  let fixture: ComponentFixture<ItemWiseSaleReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemWiseSaleReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemWiseSaleReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
