import { SharedHelpersFieldValidationsModule } from '@aims-pos/shared/helpers/field-validations';
import { COAInterface, MyFormField } from '@aims-pos/shared/interface';
import { SharedServicesDataModule } from '@aims-pos/shared/services/data';
import { SharedServicesGlobalDataModule } from '@aims-pos/shared/services/global-data';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartOfAccountTableComponent } from './chart-of-account-table/chart-of-account-table.component';

@Component({
  selector: 'aims-pos-chart-of-account',
  templateUrl: './chart-of-account.component.html',
  styleUrls: ['./chart-of-account.component.scss'],
})
export class ChartOfAccountComponent implements OnInit {
  @ViewChild(ChartOfAccountTableComponent) coaTable: any;

  roleID: any = 0;
  moduleId: string | null;
  pageFields: COAInterface = {
    coaID: '0', //0
    userID: '', //1
    coaTitle: '', //2
    coaTypeID: '', //3
    companyid: '', //4
    businessid: '', //5
    moduleId: '', //6
  };

  formFields: MyFormField[] = [
    {
      value: this.pageFields.coaID,
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
      value: this.pageFields.coaTitle,
      msg: 'enter chart of account title',
      type: 'textbox',
      required: true,
    },
    {
      value: this.pageFields.coaTypeID,
      msg: 'select chart of account type',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFields.companyid,
      msg: 'select company',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFields.businessid,
      msg: 'select business',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFields.moduleId,
      msg: '',
      type: 'hidden',
      required: false,
    },
  ];

  companyList: any = [];
  businessList: any = [];
  coaTypeList: any = [];
  error: any;

  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) {}

  ngOnInit(): void {
    this.formFields[6].value = localStorage.getItem('moduleId');
    this.formFields[1].value = this.globalService.getUserId().toString();
    this.moduleId = localStorage.getItem('moduleId');
    this.roleID = this.globalService.getRoleId();
    this.getCompany();
    this.getCOAType();
  }

  getCompany() {
    this.dataService.getHttp('cmis-api/Company/getCompany', '').subscribe(
      (response: any) => {
        this.companyList = response;
        if (this.globalService.getRoleId() != 1) {
          this.getBusiness();
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getBusiness() {
    var companyID = 0;
    if (this.globalService.getRoleId() == 1) {
      companyID = this.formFields[4].value;
    } else {
      companyID = this.globalService.getCompanyID();
    }
    this.dataService
      .getHttp('cmis-api/Business/getBusiness?companyID=' + companyID, '')
      .subscribe(
        (response: any) => {
          this.businessList = response;
          if (this.globalService.getRoleId() != 1) {
            this.formFields[4].value = this.globalService.getCompanyID();
            this.formFields[5].value = this.globalService.getBusinessID();
          }
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  getCOAType() {
    this.dataService
      .getHttp(
        'core-api/ChartOfAccount/getCOAType?&userID=' +
          this.globalService.getUserId() +
          '&moduleId=' +
          this.moduleId,
        ''
      )
      .subscribe(
        (response: any) => {
          this.coaTypeList = response;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  save() {
    this.dataService
      .savetHttp(
        this.pageFields,
        this.formFields,
        'core-api/ChartOfAccount/saveCOA'
      )
      .subscribe(
        (response: any) => {
          console.log(response);
          if (response.message == 'Success') {
            if (this.formFields[0].value == '0') {
              this.valid.apiInfoResponse('Record saved successfully');
            } else {
              this.valid.apiInfoResponse('Record updated successfully');
            }

            this.coaTable.getCOA();
            this.reset();
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

  reset() {
    this.formFields = this.valid.resetFormFields(this.formFields);

    this.formFields[0].value = '0';
  }

  edit(item: any) {
    console.log(item);
    this.formFields[4].value = item.companyid;
    this.getBusiness();

    this.formFields[0].value = item.coaID;
    this.formFields[2].value = item.coaTitle;
    this.formFields[3].value = item.coaTypeID;
    this.formFields[5].value = item.businessid;
  }

  getKeyPressed(e: any) {
    if (e.keyCode == 13) {
      this.save();
    }
  }

  delete(item: any) {
    this.reset();
  }
}
