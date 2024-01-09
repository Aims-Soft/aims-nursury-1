import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'aims-pos-profit-loss-report',
  templateUrl: './profit-loss-report.component.html',
  styleUrls: ['./profit-loss-report.component.scss'],
})
export class ProfitLossReportComponent implements OnInit {
  dtpFromDate: any = '';
  dtpToDate: any = '';

  reportList: any = [];

  constructor() {}

  ngOnInit(): void {
    this.dtpFromDate = new Date();
    this.dtpToDate = new Date();
  }

  exportExcel() {
    // if (this.reportList.length > 0) {
    //   this.global.exportExcel('print-report', 'Profit Loss Report');
    // } else {
    //   this.valid.apiInfoResponse('no record found to convert into excel');
    // }
  }
}
