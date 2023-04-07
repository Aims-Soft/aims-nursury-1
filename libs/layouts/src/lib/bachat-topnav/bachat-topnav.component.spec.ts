import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BachatTopnavComponent } from './bachat-topnav.component';

describe('BachatTopnavComponent', () => {
  let component: BachatTopnavComponent;
  let fixture: ComponentFixture<BachatTopnavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BachatTopnavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BachatTopnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
