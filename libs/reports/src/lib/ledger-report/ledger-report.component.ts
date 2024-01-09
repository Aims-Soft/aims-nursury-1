import { Component, OnInit } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@aims-pos/shared/helpers/field-validations';
import { SharedServicesDataModule } from '@aims-pos/shared/services/data';
import { SharedServicesGlobalDataModule } from '@aims-pos/shared/services/global-data';
import { DatePipe } from '@angular/common';
import { RepositionScrollStrategy } from '@angular/cdk/overlay';

@Component({
  selector: 'aims-pos-ledger-report',
  templateUrl: './ledger-report.component.html',
  styleUrls: ['./ledger-report.component.scss'],
})
export class LedgerReportComponent implements OnInit {
  cmbCOA = '';
  lblAccountHead = '';
  dtpFromDate = '';
  dtpToDate = '';
  lblTotalDebit = 0;
  lblTotalCredit = 0;
  lblTotalBalance = 0;

  coaList: any = [];
  reportList: any = [];
  moduleId: string | null;
  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule,
    public datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.moduleId = localStorage.getItem('moduleId');
    this.getChartOfAccount();
  }

  getChartOfAccount() {
    this.dataService
      .getHttp(
        'core-api/ChartOfAccount/getCOA?companyID=' +
          this.globalService.getCompanyID() +
          '&businessID=' +
          this.globalService.getBusinessID() +
          '&userID=' +
          this.globalService.getUserId() +
          '&moduleId=' +
          this.moduleId,
        ''
      )
      .subscribe(
        (response: any) => {
          this.coaList = response;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  getAccountHead(item: any) {
    var data = this.coaList.filter((x: { coaID: any }) => x.coaID == item);

    this.lblAccountHead = data[0].coaTitle;
  }

  showReport() {
    if (this.cmbCOA == '' || this.cmbCOA == undefined || this.cmbCOA == null) {
      this.valid.apiErrorResponse('select account head');
      return;
    }
    if (
      this.dtpFromDate == '' ||
      this.dtpFromDate == undefined ||
      this.dtpFromDate == null
    ) {
      this.valid.apiErrorResponse('select from date');
      return;
    }
    if (
      this.dtpToDate == '' ||
      this.dtpToDate == undefined ||
      this.dtpToDate == null
    ) {
      this.valid.apiErrorResponse('select to date');
      return;
    }

    // this.reportList.push({
    //   invoiceNo: '1',
    //   invoiceType: 'S',
    //   invoiceDate: '2022-03-10',
    //   instrumentNo: '213123121',
    //   description: 'teeaytsdvcbn v',
    //   debit: '15000',
    //   credit: '5000',
    //   balance: '10000',

    // })
    this.dataService
      .getHttp(
        'report-api/FMISReport/getLedgerReport?coaID=' +
          this.cmbCOA +
          '&fromDate=' +
          this.datepipe.transform(this.dtpFromDate, 'yyyy-MM-dd') +
          '&toDate=' +
          this.datepipe.transform(this.dtpToDate, 'yyyy-MM-dd') +
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
          // this.reportList = response;
          this.reportList = [];
          var balance = 0;
          for (var i = 0; i < response.length; i++) {
            balance =
              balance +
              (parseInt(response[i].debit) - parseInt(response[i].credit));
            this.reportList.push({
              invoiceno: response[i].invoiceno,
              partyname: response[i].partyname,
              invoicetype: response[i].invoicetype,
              invoicedate: response[i].invoicedate,
              instrumentno: response[i].instrumentno,
              description: response[i].description,
              debit: response[i].debit,
              credit: response[i].credit,
              balance: balance,
            });

            this.lblTotalDebit += response[i].debit;
            this.lblTotalCredit += response[i].credit;
            this.lblTotalBalance = balance;
          }
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  exportExcel() {
    if (this.reportList.length > 0) {
      this.globalService.exportExcel('print-report', 'Ledger Report');
    } else {
      this.valid.apiInfoResponse('no record found to convert into excel');
    }
  }
}
