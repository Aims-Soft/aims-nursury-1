import { SharedHelpersFieldValidationsModule } from '@aims-pos/shared/helpers/field-validations';
import { SharedServicesDataModule } from '@aims-pos/shared/services/data';
import { SharedServicesGlobalDataModule } from '@aims-pos/shared/services/global-data';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'aims-pos-credit-report',
  templateUrl: './credit-report.component.html',
  styleUrls: ['./credit-report.component.scss'],
})
export class CreditReportComponent implements OnInit {
  lblBusinessName: any = '';

  invoiceDate: any = '';

  moduleId: string | null;
  reportList: any = [];

  // rptImg: any = 'assets/ui/ReportPictures/Logo.svg'
  constructor(
    private globalService: SharedServicesGlobalDataModule,
    private dataService: SharedServicesDataModule,
    private valid: SharedHelpersFieldValidationsModule,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.getBusniessName();

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

  getCreditReport(invoiceDate: any) {
    var startdate;
    startdate = this.datePipe.transform(invoiceDate, 'yyyy-MM-dd');
    this.dataService
      .getHttp(
        'report-api/FMISReport/getCreditReport?invoiceDate=' +
          startdate +
          '&userID=' +
          this.globalService.getUserId() +
          '&moduleId=' +
          this.moduleId +
          '&branchID=' +
          this.globalService.getBranchID(),
        ''
      )
      .subscribe(
        (response: any) => {
          this.reportList = response;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  exportExcel() {
    if (this.reportList.length > 0) {
      this.globalService.exportExcel('print-report', 'Credit Report');
    } else {
      this.valid.apiInfoResponse('no record found to convert into excel');
    }
  }
}
