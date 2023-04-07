import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BachatOnlineStockComponent } from './bachat-online-stock.component';

describe('BachatOnlineStockComponent', () => {
  let component: BachatOnlineStockComponent;
  let fixture: ComponentFixture<BachatOnlineStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BachatOnlineStockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BachatOnlineStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
