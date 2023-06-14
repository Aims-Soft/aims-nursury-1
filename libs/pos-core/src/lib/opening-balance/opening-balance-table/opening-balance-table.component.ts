import { SharedServicesDataModule } from '@aims-pos/shared/services/data';
import { SharedServicesGlobalDataModule } from '@aims-pos/shared/services/global-data';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'aims-pos-opening-balance-table',
  templateUrl: './opening-balance-table.component.html',
  styleUrls: ['./opening-balance-table.component.scss'],
})
export class OpeningBalanceTableComponent implements OnInit {
  tableData: any = [];
  moduleId: string | null;
  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule
  ) {}

  ngOnInit(): void {
    this.getBalance();
    this.moduleId = localStorage.getItem('moduleId');
  }

  getBalance() {
    this.dataService
      .getHttp(
        'core-api/OpeningBalance/getOpeningBalance?companyID=' +
          this.globalService.getCompanyID() +
          '&businessID=' +
          this.globalService.getBusinessID() +
          '&branchID=' +
          this.globalService.getBranchID() +
          '&userID=' +
          this.globalService.getUserId() +
          '&moduleId=' +
          this.moduleId,
        ''
      )
      .subscribe(
        (response: any) => {
          this.tableData = response;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }
}
