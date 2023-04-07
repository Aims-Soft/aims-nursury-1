import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpeningBalanceTableComponent } from './opening-balance-table.component';

describe('OpeningBalanceTableComponent', () => {
  let component: OpeningBalanceTableComponent;
  let fixture: ComponentFixture<OpeningBalanceTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpeningBalanceTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpeningBalanceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
