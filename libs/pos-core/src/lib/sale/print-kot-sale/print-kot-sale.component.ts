import { SharedHelpersFieldValidationsModule } from '@aims-pos/shared/helpers/field-validations';
import { SharedServicesDataModule } from '@aims-pos/shared/services/data';
import { SharedServicesGlobalDataModule } from '@aims-pos/shared/services/global-data';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'aims-pos-print-kot-sale',
  templateUrl: './print-kot-sale.component.html',
  styleUrls: ['./print-kot-sale.component.scss'],
})
export class PrintKotSaleComponent implements OnInit {

  lblContactNumber:any;
  isCustomer = ''; //if customer then show total
  toPrintData:any=[];
  tableData:any=[];

  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) {}

  ngOnInit(): void {
    this.getBusniessName();
  }

  print() {
    console.log(this.toPrintData);
    setTimeout(() => this.globalService.printData('#print-summary'), 200);
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
          // this.lblBusinessName = response[0].businessFullName;
          this.lblContactNumber = response[0].mobileNo;
          // this.bankList = response;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }
}
