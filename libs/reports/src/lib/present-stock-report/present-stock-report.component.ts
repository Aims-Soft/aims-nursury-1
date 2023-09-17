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
  moduleId: string | null;
  lblBusinessName: any = '';
  constructor(
    private global: SharedServicesGlobalDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private dataService: SharedServicesDataModule,
    private valid: SharedHelpersFieldValidationsModule,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.getBusniessName();
    // this.dtpCurrentDate = new Date();
    this.moduleId = localStorage.getItem('moduleId');
  }
  getBusniessName() {
    this.dataService
      .getHttp(
        'cmis-api/Branch/getBusniessName?branchID=' +
          this.globalService.getBranchID(),
        ''
      )
      .subscribe(
        (response: any) => {
          this.lblBusinessName = response[0].businessFullName;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }
  getDailyStockReport() {
    var date;
    date = this.datePipe.transform(this.reportDate, 'yyyy-MM-dd');
    this.dataService
      .getHttp(
        'report-api/FMISReport/getStockInStockOut?invDate=' +
          date +
          '&userID=' +
          this.globalService.getUserId() +
          '&moduleId=' +
          this.moduleId +
          '&companyID=' +
          this.globalService.getCompanyID() +
          '&businessID=' +
          this.globalService.getBusinessID(),
        ''
      )
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
