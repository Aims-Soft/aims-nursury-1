import { SharedHelpersFieldValidationsModule } from '@aims-pos/shared/helpers/field-validations';
import { DesignationInterface, MyFormField } from '@aims-pos/shared/interface';
import { SharedServicesDataModule } from '@aims-pos/shared/services/data';
import { SharedServicesGlobalDataModule } from '@aims-pos/shared/services/global-data';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DesignationTableComponent } from './designation-table/designation-table.component';

@Component({
  selector: 'aims-pos-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.scss'],
})
export class DesignationComponent implements OnInit {
  @ViewChild(DesignationTableComponent) designationTable: any;

  roleID: any = 0;

  pageFields: DesignationInterface = {
    designationID: '0', //0
    userID: '', //1
    companyid: '', //2
    businessid: '', //3
    designationName: '', //4
    moduleId: '',
  };

  formFields: MyFormField[] = [
    {
      value: this.pageFields.designationID,
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
      value: this.pageFields.designationName,
      msg: 'enter designation name',
      type: 'name',
      required: true,
    },
    {
      value: this.pageFields.moduleId,
      msg: '',
      type: '',
      required: false,
    },
  ];

  companyList: any = [];
  businessList: any = [];
  error: any;

  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) {}

  ngOnInit(): void {
    this.formFields[1].value = this.globalService.getUserId().toString();
    this.formFields[5].value = localStorage.getItem('moduleId');
    this.roleID = this.globalService.getRoleId();
    this.getCompany();
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
      companyID = this.formFields[2].value;
    } else {
      companyID = this.globalService.getCompanyID();
    }
    this.dataService
      .getHttp('cmis-api/Business/getBusiness?companyID=' + companyID, '')
      .subscribe(
        (response: any) => {
          this.businessList = response;
          if (this.globalService.getRoleId() != 1) {
            this.formFields[2].value = this.globalService.getCompanyID();
            this.formFields[3].value = this.globalService.getBusinessID();
          }
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
        'core-api/Designation/saveDesignation'
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

            this.designationTable.getDesignation();
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
    this.formFields[2].value = item.companyid;

    this.getBusiness();
    this.formFields[0].value = item.designationID;
    this.formFields[3].value = item.businessid;
    this.formFields[4].value = item.desginationName;
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
