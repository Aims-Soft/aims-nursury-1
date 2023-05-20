import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';

import { MaterialModule } from '@aims-pos/material';
import { FormsModule } from '@angular/forms';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { NgxPrintModule } from 'ngx-print';

import { DailySaleReportComponent } from './daily-sale-report/daily-sale-report.component';
import { LedgerReportComponent } from './ledger-report/ledger-report.component';
import { ProfitLossReportComponent } from './profit-loss-report/profit-loss-report.component';
import { PartyLedgerReportComponent } from './party-ledger-report/party-ledger-report.component';
import { PresentStockReportComponent } from './present-stock-report/present-stock-report.component';
import { DailyCategorySaleReportComponent } from './daily-category-sale-report/daily-category-sale-report.component';
import { PeriodicSaleReportComponent } from './periodic-sale-report/periodic-sale-report.component';
import { PeriodicCategorySaleReportComponent } from './periodic-category-sale-report/periodic-category-sale-report.component';
import { TrialBalanceComponent } from './trial-balance/trial-balance.component';
import { JournalVoucherComponent } from './journal-voucher/journal-voucher.component';
import { BalanceSheetComponent } from './balance-sheet/balance-sheet.component';
import { DailyInvoiceReportComponent } from './daily-invoice-report/daily-invoice-report.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

export const reportsRoutes: Route[] = [
  { path: 'dailysalerpt', component: DailySaleReportComponent },
  { path: 'ledgerrpt', component: LedgerReportComponent },
  { path: 'profitlossrpt', component: ProfitLossReportComponent },
  { path: 'partyledgerrpt', component: PartyLedgerReportComponent },
  { path: 'presentstockrpt', component: PresentStockReportComponent },
  { path: 'dailycatsalerpt', component: DailyCategorySaleReportComponent },
  { path: 'persalerpt', component: PeriodicSaleReportComponent },
  { path: 'percatsalerpt', component: PeriodicCategorySaleReportComponent },
  { path: 'trialbalrpt', component: TrialBalanceComponent },
  { path: 'balsheetrpt', component: BalanceSheetComponent },
  { path: 'jourvoucherrpt', component: JournalVoucherComponent },
  { path: 'saleproductrpt', component: DailyInvoiceReportComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(reportsRoutes),
    MaterialModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgxMatSelectSearchModule,
    PerfectScrollbarModule,
    NgxPrintModule,
  ],
  declarations: [
    DailySaleReportComponent,
    LedgerReportComponent,
    ProfitLossReportComponent,
    PartyLedgerReportComponent,
    PresentStockReportComponent,
    DailyCategorySaleReportComponent,
    PeriodicSaleReportComponent,
    PeriodicCategorySaleReportComponent,
    TrialBalanceComponent,
    JournalVoucherComponent,
    BalanceSheetComponent,
    DailyInvoiceReportComponent,
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
  ],
})
export class ReportsModule {}
