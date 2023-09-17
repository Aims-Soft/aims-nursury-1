import { SharedHelpersFieldValidationsModule } from '@aims-pos/shared/helpers/field-validations';
import { SharedServicesDataModule } from '@aims-pos/shared/services/data';
import { SharedServicesGlobalDataModule } from '@aims-pos/shared/services/global-data';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'aims-pos-print-kot-sale',
  templateUrl: './print-kot-sale.component.html',
  styleUrls: ['./print-kot-sale.component.scss']
})
export class PrintKotSaleComponent implements OnInit {

  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) {}

  ngOnInit(): void {
  }

  print(printSection:any){
    this.globalService.printData(printSection), 200;
  }

}
