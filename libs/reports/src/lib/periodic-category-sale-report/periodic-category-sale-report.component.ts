import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'aims-pos-periodic-category-sale-report',
  templateUrl: './periodic-category-sale-report.component.html',
  styleUrls: ['./periodic-category-sale-report.component.scss']
})
export class PeriodicCategorySaleReportComponent implements OnInit {

  dtpCurrentDate: any = '';

  constructor() { }

  ngOnInit(): void {
    this.dtpCurrentDate = new Date();
  }

}
