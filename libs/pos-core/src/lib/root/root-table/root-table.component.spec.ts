import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RootTableComponent } from './root-table.component';

describe('RootTableComponent', () => {
  let component: RootTableComponent;
  let fixture: ComponentFixture<RootTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RootTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RootTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
