import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyImageUploadingComponent } from './company-image-uploading.component';

describe('CompanyImageUploadingComponent', () => {
  let component: CompanyImageUploadingComponent;
  let fixture: ComponentFixture<CompanyImageUploadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyImageUploadingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyImageUploadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
