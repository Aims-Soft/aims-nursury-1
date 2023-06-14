import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCustoomerComponent } from './add-custoomer.component';

describe('AddCustoomerComponent', () => {
  let component: AddCustoomerComponent;
  let fixture: ComponentFixture<AddCustoomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCustoomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCustoomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
