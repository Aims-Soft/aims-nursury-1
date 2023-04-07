import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'aims-pos-daily-category-sale-report',
  templateUrl: './daily-category-sale-report.component.html',
  styleUrls: ['./daily-category-sale-report.component.scss']
})
export class DailyCategorySaleReportComponent implements OnInit {

  dtpCurrentDate: any = '';

  constructor() { }

  ngOnInit(): void {
    this.dtpCurrentDate = new Date();
  }

}
