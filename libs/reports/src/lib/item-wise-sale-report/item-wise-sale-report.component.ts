import { SharedHelpersFieldValidationsModule } from '@aims-pos/shared/helpers/field-validations';
import { SharedServicesDataModule } from '@aims-pos/shared/services/data';
import { SharedServicesGlobalDataModule } from '@aims-pos/shared/services/global-data';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'aims-pos-item-wise-sale-report',
  templateUrl: './item-wise-sale-report.component.html',
  styleUrls: ['./item-wise-sale-report.component.scss'],
})
export class ItemWiseSaleReportComponent implements OnInit {
  // currentDate: any = '';
  startDate: any = '';
  endDate: any = '';
  sale: any;
  reportList: any = [];
  discountList: any = [];
  lblTotalSale: any = '';
  lblTotalCost: any = '';
  lblTotalMargin: any;
  lblTotalDiscoount: any;
  lblGrandTotal: any = '';
  moduleId: string | null;
  lblBusinessName: any = '';

  // rptImg: any = 'assets/ui/ReportPictures/Logo.svg'
  constructor(
    private global: SharedServicesGlobalDataModule,
    private dataService: SharedServicesDataModule,
    private valid: SharedHelpersFieldValidationsModule,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.getBusniessName();
    // this.currentDate = new Date();
    this.moduleId = localStorage.getItem('moduleId');
  }

  getBusniessName() {
    this.dataService
      .getHttp(
        'cmis-api/Branch/getBusniessName?branchID=' + this.global.getBranchID(),
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
  getReport(start: any, end: any) {
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
          'report-api/FMISReport/getItemWiseDailySales?startDate=' +
            startdate +
            '&endDate=' +
            enddate +
            '&userID=' +
            this.global.getUserId() +
            '&moduleId=' +
            this.moduleId +
            '&branchID=' +
            this.global.getBranchID(),
          ''
        )
        .subscribe(
          (response: any) => {
            console.log(response);
            this.reportList = response;
            {
            }
            this.reportList = [];
            for (var i = 0; i < response.length; i++) {
              this.reportList.push({
                productName: response[i].productName,
                qty: response[i].qty,
                costPrice: response[i].costPrice,
                salePrice: response[i].salePrice,
                totalCostPrice: response[i].qty * response[i].costPrice,
                totalSalePrice: response[i].qty * response[i].salePrice,
              });
            }

            // this.sale = this.reportList.reduce((sum: any, total: any) => {
            //   return sum + total.salePrice;
            // }, 0);
            // this.lblTotalSale = this.sale;
            // const cost = this.reportList.reduce((sum: any, total: any) => {
            //   return sum + total.costPrice;
            // }, 0);
            // this.lblTotalCost = cost;

            // var margin: any = this.reportList.reduce((sum: any, total: any) => {
            //   return sum + total.margin;
            // }, 0);
            // this.lblTotalMargin = this.sale - cost;
          },
          (error: any) => {
            console.log(error);
          }
        );
    }
  }

  exportExcel() {
    if (this.reportList.length > 0) {
      this.global.exportExcel('print-report', 'Item Wise Sale Report');
    } else {
      this.valid.apiInfoResponse('no record found to convert into excel');
    }
  }
}
