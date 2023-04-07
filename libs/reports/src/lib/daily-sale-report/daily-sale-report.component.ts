import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'aims-pos-daily-sale-report',
  templateUrl: './daily-sale-report.component.html',
  styleUrls: ['./daily-sale-report.component.scss']
})
export class DailySaleReportComponent implements OnInit {

  currentDate: any = '';

  // rptImg: any = 'assets/ui/ReportPictures/Logo.svg'
  constructor() { }

  ngOnInit(): void {
    this.currentDate = new Date();
  }

}
