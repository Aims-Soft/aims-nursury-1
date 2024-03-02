import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@aims-pos/shared/helpers/field-validations';
import {
  CounterInterface,
  MyFormField,
  OpeningInterface,
  SaleInterface,
} from '@aims-pos/shared/interface';
import { SharedServicesDataModule } from '@aims-pos/shared/services/data';
import { SharedServicesGlobalDataModule } from '@aims-pos/shared/services/global-data';
import { DatePipe } from '@angular/common';
import { CounterInfoComponent } from './counter-info/counter-info.component';

@Component({
  selector: 'aims-pos-opening',
  templateUrl: './opening.component.html',
  styleUrls: ['./opening.component.scss'],
})
export class OpeningComponent implements OnInit {
  @ViewChild(CounterInfoComponent) counterInfo: any;

  lblTotalAmout: number = 0;

  counterList: any;
  usersList: any;
  jsonList: any;

  tblValue: any = 0;

  tableList: any;
  tabIndex: any;
  error: any;
  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule,
    public datepipe: DatePipe
  ) {}
  ngOnInit(): void {
    this.formFields[2].value = this.globalService.getUserId().toString();
    this.formFields[8].value = localStorage.getItem('moduleId');

    this.getCounter();
    this.getUser();
    this.getCurrency();
    this.getOpenedCounters();
  }

  pageFields: OpeningInterface = {
    shiftID: '0', //0
    counterID: '', //1
    userID: '', //2
    shiftDate: '', //3
    shiftStartTime: '', //4
    openingBalance: '', //5
    counterUserID: '', //6
    json: '', //7
    moduleId: '', //8
  };

  formFields: MyFormField[] = [
    {
      value: this.pageFields.shiftID,
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
      value: this.pageFields.userID,
      msg: 'select user',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFields.shiftDate,
      msg: 'enter date ',
      type: 'textbox',
      required: true,
    },
    {
      value: this.pageFields.shiftStartTime,
      msg: 'enter start time ',
      type: 'textbox',
      required: true,
    },
    {
      value: this.pageFields.openingBalance,
      msg: 'enter opening balance ',
      type: 'number',
      required: true,
    },
    {
      value: this.pageFields.counterUserID,
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
      value: this.pageFields.moduleId,
      msg: '',
      type: 'hidden',
      required: false,
    },
  ];

  getOpenedCounters() {
    this.dataService
      .getHttp(
        'core-api/Opening/getOpenedCounters?branchId=' +
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
          // this.usersList = response;
          this.counterInfo.tableData = response;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

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
    // console.log(
    //   this.globalService.getBranchID(),
    //   this.globalService.getUserId(),
    //   localStorage.getItem('moduleId')
    // );
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
    this.formFields[7].value = JSON.stringify(this.tableList);
    this.formFields[3].value = this.datepipe.transform(
      this.formFields[3].value,
      'yyyy-MM-dd'
    );
    this.dataService
      .savetHttp(
        this.pageFields,
        this.formFields,
        'core-api/Opening/saveOpeningBalance'
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
