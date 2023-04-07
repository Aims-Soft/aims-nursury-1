import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarcodeTableComponent } from './barcode-table.component';

describe('BarcodeTableComponent', () => {
  let component: BarcodeTableComponent;
  let fixture: ComponentFixture<BarcodeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarcodeTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarcodeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
