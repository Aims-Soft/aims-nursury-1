import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosDashboardComponent } from './pos-dashboard.component';

describe('PosDashboardComponent', () => {
  let component: PosDashboardComponent;
  let fixture: ComponentFixture<PosDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PosDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PosDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
