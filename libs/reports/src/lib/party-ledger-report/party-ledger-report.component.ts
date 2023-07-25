import { SharedHelpersFieldValidationsModule } from '@aims-pos/shared/helpers/field-validations';
import { SharedServicesDataModule } from '@aims-pos/shared/services/data';
import { SharedServicesGlobalDataModule } from '@aims-pos/shared/services/global-data';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'aims-pos-party-ledger-report',
  templateUrl: './party-ledger-report.component.html',
  styleUrls: ['./party-ledger-report.component.scss'],
})
export class PartyLedgerReportComponent implements OnInit {
  cmbParty = '';
  cmbCOA = '';
  lblPartyName = '';
  dtpFromDate = '';
  dtpToDate = '';
  lblTotalDebit = 0;
  lblTotalCredit = 0;
  lblTotalBalance = 0;
  coaList: any = [];
  partyList: any = [];
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
    this.getParty();
    this.getChartOfAccount();
  }

  getParty() {
    this.dataService
      .getHttp(
        'core-api/Party/getAllParties?userID=' +
          this.globalService.getUserId() +
          '&moduleId=' +
          this.moduleId +
          '&branchID=' +
          this.globalService.getBranchID(),
        ''
      )
      .subscribe(
        (response: any) => {
          this.partyList = response;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  getPartyName(item: any) {
    var data = this.partyList.filter(
      (x: { partyID: any }) => x.partyID == item
    );

    this.lblPartyName = data[0].partyName;
  }

  showReport() {
    if (
      this.cmbParty == '' ||
      this.cmbParty == undefined ||
      this.cmbParty == null
    ) {
      this.valid.apiErrorResponse('select party name');
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
    if (this.cmbCOA == '' || null) {
      this.cmbCOA = '0';
    }

    this.dataService
      .getHttp(
        'report-api/FMISReport/getPartyLedgerReport?partyID=' +
          this.cmbParty +
          '&fromDate=' +
          this.datepipe.transform(this.dtpFromDate, 'yyyy-MM-dd') +
          '&toDate=' +
          this.datepipe.transform(this.dtpToDate, 'yyyy-MM-dd') +
          '&userID=' +
          this.globalService.getUserId() +
          '&moduleId=' +
          this.moduleId +
          '&branchID=' +
          this.globalService.getBranchID() +
          '&coaID=' +
          this.cmbCOA,
        ''
      )
      .subscribe(
        (response: any) => {
          this.reportList = [];
          var balance = 0;
          for (var i = 0; i < response.length; i++) {
            balance =
              balance +
              (parseInt(response[i].debit) - parseInt(response[i].credit));
            this.reportList.push({
              invoiceno: response[i].invoiceno,
              invoicetype: response[i].invoicetype,
              invoicedate: response[i].invoicedate,
              instrumentno: response[i].instrumentno,
              description: response[i].description,
              coatitle: response[i].coatitle,
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
}
