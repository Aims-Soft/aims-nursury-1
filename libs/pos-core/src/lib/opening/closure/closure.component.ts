import { Component, OnInit } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@aims-pos/shared/helpers/field-validations';
import {
  ClosingInterface,
  CounterInterface,
  MyFormField,
  OpeningInterface,
  SaleInterface,
} from '@aims-pos/shared/interface';
import { SharedServicesDataModule } from '@aims-pos/shared/services/data';
import { SharedServicesGlobalDataModule } from '@aims-pos/shared/services/global-data';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'aims-pos-closure',
  templateUrl: './closure.component.html',
  styleUrls: ['./closure.component.scss'],
})
export class ClosureComponent implements OnInit {
  lblTotalAmout: number = 0;

  lblTotalSalePrice: any;

  cmbcounterID: any;
  cmbUser: any;
  todate: any;
  cmbTime: any;

  tableList: any;
  usersList: any;
  counterList: any;

  modalData: any;

  error: any;
  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule,
    public datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.formFields[1].value = this.globalService.getUserId().toString();
    this.formFields[10].value = localStorage.getItem('moduleId');

    this.getCounter();
    this.getCurrency();
    this.getUser();
  }

  pageFields: ClosingInterface = {
    shiftID: '0', //0
    userID: '', //1
    counterID: '', //2
    counterUserID: '', //3
    shiftDate: '', //4
    shiftEndTime: '', //5
    closingBalance: '', //6
    reconsiliation: '', //7
    json: '', //8
    remarks: '', //9
    moduleId: '', //10
  };

  formFields: MyFormField[] = [
    {
      value: this.pageFields.shiftID,
      msg: '',
      type: 'hidden',
      required: false,
    },

    {
      value: this.pageFields.userID,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFields.counterID,
      msg: 'select counter no',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFields.counterUserID,
      msg: 'select user ',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFields.shiftDate,
      msg: 'select date ',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFields.shiftEndTime,
      msg: 'enter opening balance ',
      type: 'number',
      required: true,
    },
    {
      value: this.pageFields.closingBalance,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFields.reconsiliation,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFields.json,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFields.remarks,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFields.moduleId,
      msg: '',
      type: 'hidden',
      required: false,
    },
  ];
  getCounter() {
    this.dataService
      .getHttp(
        'core-api/Opening/getCounter?branchId=' +
          this.globalService.getBranchID() +
          '&userID=' +
          this.globalService.getUserId() +
          '&moduleId=' +
          localStorage.getItem('moduleId'),
        ''
      )
      .subscribe(
        (response: any) => {
          // console.log(response);
          this.counterList = response;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }
  getUser() {
    this.dataService
      .getHttp(
        'user-api/User/getUserCounter?branchId=' +
          this.globalService.getBranchID(),
        ''
      )
      .subscribe(
        (response: any) => {
          // console.log(response);
          this.usersList = response;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  getCurrency() {
    this.dataService
      .getHttp(
        'core-api/Opening/getCurrency?userID=' +
          this.globalService.getUserId() +
          '&moduleId=' +
          localStorage.getItem('moduleId'),
        ''
      )
      .subscribe(
        (response: any) => {
          // console.log(response);
          this.tableList = [];
          for (let i = 0; i < response.length; i++) {
            this.tableList.push({
              counterDetailID: 0,
              denomination: response[i].denomination,
              currencyID: response[i].currencyID,
              quantity: 0,
            });
          }
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  getClosingReconciliation(userId: any, counterID: any) {
    this.dataService
      .getHttp(
        'core-api/Closing/getClosingReconciliation?userID=' +
          this.globalService.getUserId() +
          '&moduleId=' +
          localStorage.getItem('moduleId') +
          '&curDate=' +
          this.datepipe.transform(this.todate, 'yyyy-MM-dd') +
          '&counterID=' +
          counterID +
          '&employeeID=' +
          userId,
        ''
      )
      .subscribe(
        (response: any) => {
          console.log(response);
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  getDetails(userId: any) {
    this.dataService
      .getHttp(
        'core-api/Closing/getClosingSaleDetail?userID=' +
          this.globalService.getUserId() +
          '&moduleId=' +
          localStorage.getItem('moduleId') +
          '&curDate=' +
          this.datepipe.transform(this.todate, 'yyyy-MM-dd') +
          '&employeeID=' +
          userId,
        ''
      )
      .subscribe(
        (response: any) => {
          // console.log(response);
          this.modalData = response;
          this.calculateTotalSalePrice(response);
          this.lblTotalSalePrice = this.calculateTotalSalePrice(response);
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  calculateTotalSalePrice(products: any) {
    let totalSalePrice = 0;
    for (let i = 0; i < products.length; i++) {
      totalSalePrice += products[i].salePrice;
    }
    return totalSalePrice;
  }

  sum(item: any) {
    const sum = item.quantity * item.denomination;
    return sum;
  }

  displaySum(item: any) {
    this.lblTotalAmout = 0;

    this.tableList.forEach((item: any) => {
      this.lblTotalAmout += this.sum(item);
    });
  }

  save() {
    this.formFields[7].value = 900;
    this.formFields[6].value = 900;
    this.formFields[0].value = 1;
    this.formFields[8].value = JSON.stringify(this.tableList);
    this.formFields[4].value = this.datepipe.transform(
      this.formFields[4].value,
      'yyyy-MM-dd'
    );
    this.dataService
      .savetHttp(
        this.pageFields,
        this.formFields,
        'core-api/Closing/saveClosingBalance'
      )
      .subscribe(
        (response: any) => {
          // console.log(response);
          if (response.message == 'Success') {
            // this.getCounterdetails();

            if (this.formFields[0].value == '0') {
              this.valid.apiInfoResponse('Record saved successfully');
            } else {
              this.valid.apiInfoResponse('Record updated successfully');
            }
          } else {
            this.valid.apiErrorResponse(response.message.toString());
          }
        },
        (error: any) => {
          this.error = error;
          this.valid.apiErrorResponse(this.error);
        }
      );
  }
}
