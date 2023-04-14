import { SharedHelpersFieldValidationsModule } from '@aims-pos/shared/helpers/field-validations';
import { SharedServicesDataModule } from '@aims-pos/shared/services/data';
import { SharedServicesGlobalDataModule } from '@aims-pos/shared/services/global-data';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'aims-pos-present-stock-report',
  templateUrl: './present-stock-report.component.html',
  styleUrls: ['./present-stock-report.component.scss'],
})
export class PresentStockReportComponent implements OnInit {
  dtpCurrentDate: any = '';
  cmbCategory: any = '';
  reportDate: any = '';
  stocktList: any = [];
  constructor(
    private global: SharedServicesGlobalDataModule,
    private dataService: SharedServicesDataModule,
    private valid: SharedHelpersFieldValidationsModule,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    // this.dtpCurrentDate = new Date();
  }
  getDailyStockReport() {
    var date;
    date = this.datePipe.transform(this.reportDate, 'yyyy-MM-dd');
    this.dataService
      .getHttp('report-api/FMISReport/getStockInStockOut?invDate=' + date, '')
      .subscribe(
        (response: any) => {
          this.stocktList = response;

          console.log(response);
          // debugger;
          // console.log(this.reportDate);
        },
        (error: any) => {
          console.log(error);
        }
      );
  }
}
