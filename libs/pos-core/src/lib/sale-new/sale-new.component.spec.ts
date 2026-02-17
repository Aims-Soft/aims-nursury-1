import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleNewComponent } from './sale-new.component';

describe('SaleNewComponent', () => {
  let component: SaleNewComponent;
  let fixture: ComponentFixture<SaleNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaleNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
