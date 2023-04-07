import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'aims-pos-periodic-sale-report',
  templateUrl: './periodic-sale-report.component.html',
  styleUrls: ['./periodic-sale-report.component.scss']
})
export class PeriodicSaleReportComponent implements OnInit {

  dtpFromDate: any = '';
  dtpToDate: any = '';

  constructor() { }

  ngOnInit(): void {
    this.dtpFromDate = new Date();
    this.dtpToDate = new Date();
  }

}
