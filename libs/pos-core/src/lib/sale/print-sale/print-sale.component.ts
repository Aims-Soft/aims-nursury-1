import { UserInterface } from '@aims-pos/shared/interface';
import { SharedServicesAuthModule } from '@aims-pos/shared/services/auth';
import { SharedServicesDataModule } from '@aims-pos/shared/services/data';
import { SharedServicesGlobalDataModule } from '@aims-pos/shared/services/global-data';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'aims-pos-print-sale',
  templateUrl: './print-sale.component.html',
  styleUrls: ['./print-sale.component.scss'],
})
export class PrintSaleComponent implements OnInit {
  @Input() customerName: string;

  lblBranchID: any = 0;
  lblInvoice: any = '';
  lblDate: any = '';
  lblName: any = '';
  lblGTotal: any = 0;
  lblDiscount: any = 0;
  lblCash: any = 0;
  lblBank: any = 0;
  lblSubTotal: any = 0;
  lblChange: any = 0;
  lblGrandBal: any = 0;
  lblNewBal: any = 0;
  lblOldBal: any = 0;
  tableData: any = [];
  lblBusinessName: any = '';
  lblContactNumber: any = '';
  currentUser!: UserInterface;

  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private authService: SharedServicesAuthModule
  ) {}

  ngOnInit(): void {
    this.getBusniessName();
    this.currentUser = this.authService.currentUserValue;
    this.lblName = this.currentUser.fullName;
    this.lblBranchID = this.globalService.getBranchID();
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
          this.lblContactNumber = response[0].mobileNo;
          // this.bankList = response;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }
}
