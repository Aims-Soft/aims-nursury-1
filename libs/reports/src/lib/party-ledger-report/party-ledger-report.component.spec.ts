import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyLedgerReportComponent } from './party-ledger-report.component';

describe('PartyLedgerReportComponent', () => {
  let component: PartyLedgerReportComponent;
  let fixture: ComponentFixture<PartyLedgerReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartyLedgerReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartyLedgerReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
