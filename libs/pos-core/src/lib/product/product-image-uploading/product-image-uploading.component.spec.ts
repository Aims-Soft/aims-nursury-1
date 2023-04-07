import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductImageUploadingComponent } from './product-image-uploading.component';

describe('ProductImageUploadingComponent', () => {
  let component: ProductImageUploadingComponent;
  let fixture: ComponentFixture<ProductImageUploadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductImageUploadingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductImageUploadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
