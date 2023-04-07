import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'aims-pos-present-stock-report',
  templateUrl: './present-stock-report.component.html',
  styleUrls: ['./present-stock-report.component.scss']
})
export class PresentStockReportComponent implements OnInit {

  dtpCurrentDate: any = '';
  cmbCategory: any = '';
  
  categoryList: any = [];
  constructor() { }

  ngOnInit(): void {
    this.dtpCurrentDate = new Date();
  }

}
