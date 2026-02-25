import { SharedHelpersFieldValidationsModule } from '@aims-pos/shared/helpers/field-validations';
import { BranchInterface, MyFormField } from '@aims-pos/shared/interface';
import { SharedServicesDataModule } from '@aims-pos/shared/services/data';
import { SharedServicesGlobalDataModule } from '@aims-pos/shared/services/global-data';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BranchTableComponent } from './branch-table/branch-table.component';

@Component({
  selector: 'aims-pos-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.scss'],
})
export class BranchComponent implements OnInit {
  @ViewChild(BranchTableComponent) branchTable: any;

  businessDisable: boolean = false;

  tabIndex = 0;
  error: any;

  pageFields: BranchInterface = {
    branchID: '0', // 0
    userID: '', // 1
    businessID: '', // 2
    branchName: '', // 3
    email: '', // 4
    mobileNo: '', // 5
    phoneNo: '', // 6
    branchAddress: '', // 7
    businessBranchID: '', // 8
  };

  formFields: MyFormField[] = [
    {
      value: this.pageFields.branchID,
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
      value: this.pageFields.businessID,
      msg: 'select business',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFields.branchName,
      msg: 'enter branch name',
      type: 'textbox',
      required: true,
    },
    {
      value: this.pageFields.email,
      msg: 'enter email',
      type: 'email',
      required: true,
    },
    {
      value: this.pageFields.mobileNo,
      msg: 'enter mobile no',
      type: 'mobile',
      required: true,
    },
    {
      value: this.pageFields.phoneNo,
      msg: 'enter phone no',
      type: 'phone',
      required: true,
    },
    {
      value: this.pageFields.branchAddress,
      msg: 'enter address',
      type: 'textbox',
      required: true,
    },
    {
      value: this.pageFields.businessBranchID,
      msg: '',
      type: '',
      required: false,
    },
  ];

  businessList: any = [];

  mobileMask = this.globalService.mobileMask();
  phoneMask = this.globalService.phoneMask();

  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) {}

  ngOnInit(): void {
    this.formFields[1].value = this.globalService.getUserId().toString();
    this.globalService.setHeaderTitle('Branch');
    this.getBusiness();
  }

  getBusiness() {
    this.dataService.getHttp('cmis-api/Business/getBusiness', '').subscribe(
      (response: any) => {
        this.businessList = response;

        if (this.globalService.getBusinessID() > 0) {
          this.businessDisable = true;

          this.formFields[2].value = this.globalService.getBusinessID();
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  save() {
    if (this.formFields[8].value == '') {
      this.formFields[8].value = '0';
    }

    if (this.formFields[0].value == '0') {
      this.dataService
        .savetHttp(
          this.pageFields,
          this.formFields,
          'cmis-api/Branch/saveBranch'
        )
        .subscribe(
          (response: any) => {
            console.log(response);
            if (response.message == 'Success') {
              this.valid.apiInfoResponse('Record saved successfully');

              this.branchTable.getBranch();
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
    } else {
      this.dataService
        .savetHttp(
          this.pageFields,
          this.formFields,
          'cmis-api/Branch/updateBranch'
        )
        .subscribe(
          (response: any) => {
            console.log(response);
            if (response.message == 'Success') {
              this.valid.apiInfoResponse('Record updated successfully');

              this.branchTable.getBranch();
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
  }

  reset() {
    // this.formFields = this.valid.resetFormFields(this.formFields);

    this.formFields[0].value = '0';
    this.formFields[3].value = '';
    this.formFields[4].value = '';
    this.formFields[5].value = '';
    this.formFields[6].value = '';
    this.formFields[7].value = '';
    this.formFields[8].value = '0';
  }

  edit(item: any) {
    console.log(item);
    // return;
    this.tabIndex = 0;

    this.formFields[0].value = item.branchID;
    this.formFields[2].value = item.businessID;

    this.formFields[3].value = item.branchName;
    this.formFields[4].value = item.email;

    this.formFields[5].value = item.mobileNo;
    this.formFields[6].value = item.phoneNo;

    this.formFields[7].value = item.branchAddress;
    this.formFields[8].value = item.businessBranchID;
  }

  changeTabHeader(tabNum: any) {
    this.tabIndex = tabNum;
  }

  getKeyPressed(e: any) {
    if (e.keyCode == 13) {
      this.save();
    }
  }
}
