import { SharedHelpersFieldValidationsModule } from '@aims-pos/shared/helpers/field-validations';
import { SharedServicesDataModule } from '@aims-pos/shared/services/data';
import { SharedServicesGlobalDataModule } from '@aims-pos/shared/services/global-data';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'aims-pos-daily-invoice-report',
  templateUrl: './daily-invoice-report.component.html',
  styleUrls: ['./daily-invoice-report.component.scss'],
})
export class DailyInvoiceReportComponent implements OnInit {
  startDate: any = '';
  endDate: any = '';
  reportList: any = [];
  lblTotalSale: any = '';
  lblTotalCost: any = '';
  lblTotalMargin: any = '';
  lblTotalDiscoount: any = '';
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
  getDailyInvoice(start: any, end: any) {
    if (start == '') {
      // console.log('enter start date');
      this.valid.apiInfoResponse('enter start date');
    }

    // debugger;
    if (start !== '' && end !== '') {
      var startdate, enddate;
      startdate = this.datePipe.transform(start, 'yyyy-MM-dd');
      enddate = this.datePipe.transform(end, 'yyyy-MM-dd');
      this.dataService
        .getHttp(
          'report-api/FMISReport/getDailySalesByOrder?startDate=' +
            startdate +
            '&endDate=' +
            enddate +
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
            const sale = this.reportList.reduce((sum: any, total: any) => {
              return sum + total.salePrice;
            }, 0);
            this.lblTotalSale = sale;

            const cost = this.reportList.reduce((sum: any, total: any) => {
              return sum + total.costPrice;
            }, 0);
            this.lblTotalCost = cost;

            const margin = this.reportList.reduce((sum: any, total: any) => {
              return sum + total.margin;
            }, 0);
            this.lblTotalMargin = margin;
            const disc = this.reportList.reduce((sum: any, total: any) => {
              return sum + total.discount;
            }, 0);
            this.lblTotalDiscoount = disc;
          },
          (error: any) => {
            console.log(error);
          }
        );
    }
  }

  exportExcel() {
    if (this.reportList.length > 0) {
      this.global.exportExcel('print-report', 'Daily Invoice Report');
    } else {
      this.valid.apiInfoResponse('no record found to convert into excel');
    }
  }
}
