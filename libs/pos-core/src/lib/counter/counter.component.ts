import { Component, OnInit } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@aims-pos/shared/helpers/field-validations';
import {
  CounterInterface,
  MyFormField,
  SaleInterface,
} from '@aims-pos/shared/interface';
import { SharedServicesDataModule } from '@aims-pos/shared/services/data';
import { SharedServicesGlobalDataModule } from '@aims-pos/shared/services/global-data';
@Component({
  selector: 'aims-pos-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
})
export class CounterComponent implements OnInit {
  tableData: any;

  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) {}

  error: any;
  pageFields: CounterInterface = {
    counterID: '0', //0
    userID: '', //1
    spType: '', //2
    counterName: '', //3
    counterNo: '', //4
    grassAmount: '', //5
    businessid: '', //6
    companyid: '', //7
    moduleId: '', //8
  };

  formFields: MyFormField[] = [
    {
      value: this.pageFields.counterID,
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
      value: this.pageFields.spType,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFields.counterName,
      msg: 'enter counter name',
      type: 'textbox',
      required: true,
    },

    {
      value: this.pageFields.counterNo,
      msg: 'enter counter no',
      type: 'number',
      required: true,
    },
    {
      value: this.pageFields.grassAmount,
      msg: 'enter grace ammount',
      type: 'number',
      required: true,
    },

    {
      value: this.pageFields.spType,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFields.businessid,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFields.companyid,
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
  ngOnInit(): void {
    // this.globalService.setHeaderTitle('Add Counter');
    this.formFields[1].value = this.globalService.getUserId().toString();
    this.formFields[6].value = this.globalService.getBusinessID();
    this.formFields[7].value = this.globalService.getCompanyID();
    this.formFields[8].value = localStorage.getItem('moduleId');

    this.getCounterdetails();
  }

  save() {
    this.formFields[2].value = 'insert';
    if (this.formFields[0].value == 0) {
    }
    this.dataService
      .savetHttp(
        this.pageFields,
        this.formFields,
        'core-api/CashCounter/saveCounter'
      )
      .subscribe(
        (response: any) => {
          // console.log(response);
          if (response.message == 'Success') {
            this.getCounterdetails();

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

  getCounterdetails() {
    this.dataService
      .getHttp(
        'core-api/CashCounter/getCounter?businessid=' +
          this.globalService.getBusinessID() +
          '&companyid=' +
          this.globalService.getCompanyID() +
          '&userID=' +
          this.globalService.getUserId() +
          '&moduleId=' +
          localStorage.getItem('moduleId'),
        ''
      )
      .subscribe(
        (response: any) => {
          // console.log(response);
          this.tableData = response;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }
  edit(item: any) {
    console.log(item);
    this.formFields[0].value = item.counterID;
    this.formFields[3].value = item.counterName;
    this.formFields[4].value = item.counterNo;
    this.formFields[5].value = item.grassAmount;
  }

  delete(item: any) {
    var pageFields = {
      counterID: '0',
      userID: '',
      spType: '',
      businessid: '',
      companyid: '',
      moduleId: '',
    };

    var formFields: MyFormField[] = [
      {
        value: pageFields.counterID,
        msg: '',
        type: 'hidden',
        required: false,
      },
      {
        value: pageFields.userID,
        msg: '',
        type: 'hidden',
        required: false,
      },
      {
        value: pageFields.spType,
        msg: '',
        type: 'hidden',
        required: false,
      },
      {
        value: pageFields.businessid,
        msg: '',
        type: 'hidden',
        required: false,
      },
      {
        value: pageFields.companyid,
        msg: '',
        type: 'hidden',
        required: false,
      },
      {
        value: pageFields.moduleId,
        msg: '',
        type: 'hidden',
        required: false,
      },
    ];
    formFields[0].value = item.counterID;
    formFields[1].value = this.globalService.getUserId().toString();
    formFields[3].value = this.globalService.getBusinessID();
    formFields[2].value = 'delete';

    formFields[4].value = this.globalService.getCompanyID();
    formFields[5].value = localStorage.getItem('moduleId');

    this.dataService
      .deleteHttp(pageFields, formFields, 'core-api/CashCounter/saveCounter')
      .subscribe(
        (response: any) => {
          if (response.message == 'Success') {
            this.valid.apiInfoResponse('Record deleted successfully');
            // this.getBranch();
            this.getCounterdetails();
          } else {
            this.valid.apiErrorResponse(response[0]);
          }
        },
        (error: any) => {
          this.error = error;
          this.valid.apiErrorResponse(this.error);
        }
      );
  }
}
