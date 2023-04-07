import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BachatTopSideNavComponent } from './bachat-top-side-nav.component';

describe('BachatTopSideNavComponent', () => {
  let component: BachatTopSideNavComponent;
  let fixture: ComponentFixture<BachatTopSideNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BachatTopSideNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BachatTopSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
