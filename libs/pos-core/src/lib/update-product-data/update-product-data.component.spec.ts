import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProductDataComponent } from './update-product-data.component';

describe('UpdateProductDataComponent', () => {
  let component: UpdateProductDataComponent;
  let fixture: ComponentFixture<UpdateProductDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateProductDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProductDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
