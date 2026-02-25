import { Component, OnInit, ViewChild } from '@angular/core';
import { MyFormField, UserCreationInterface } from '@aims-pos/shared/interface';
import { SharedServicesDataModule } from '@aims-pos/shared/services/data';
import { SharedServicesGlobalDataModule } from '@aims-pos/shared/services/global-data';
import { SharedHelpersFieldValidationsModule } from '@aims-pos/shared/helpers/field-validations';
import { UserTableComponent } from './user-table/user-table.component';
declare var $: any;

@Component({
  selector: 'aims-pos-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  @ViewChild(UserTableComponent) userTable: any;

  roleID: any = 0;
  txtSearch: any = '';
  txtConfirmPw: any = '';
  lblUserCount: any = 0;
  hide = true;
  hidecp = true;

  pageFields: UserCreationInterface = {
    userID: '0', //0
    spType: '', //1
    empName: '', //2
    loginName: '', //3
    Password: '', //4
    roleId: '0', //5
    companyID: '0', //6
    userTypeID: '0', //7
    dateOfBirth: '', //8
    businessID: '0', //9
    branchID: '0', //10
  };

  formFields: MyFormField[] = [
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
      value: this.pageFields.empName,
      msg: 'enter full name',
      type: 'name',
      required: true,
    },
    {
      value: this.pageFields.loginName,
      msg: 'enter email',
      type: 'email',
      required: true,
    },
    {
      value: this.pageFields.Password,
      msg: 'enter password',
      type: 'textbox',
      required: true,
    },
    {
      value: this.pageFields.roleId,
      msg: 'select role',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFields.companyID,
      msg: 'select company',
      type: 'selectbox',
      required: false,
    },
    {
      value: this.pageFields.userTypeID,
      msg: 'select userTypeID',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFields.dateOfBirth,
      msg: '',
      type: 'datePicker',
      required: false,
    },
    {
      value: this.pageFields.businessID,
      msg: 'select business',
      type: 'selectbox',
      required: false,
    },
    {
      value: this.pageFields.branchID,
      msg: 'select branch',
      type: 'selectbox',
      required: true,
    },
  ];

  companyList: any = [];
  businessList: any = [];
  branchList: any = [];
  roleList: any = [];

  error: any;

  constructor(
    private global: SharedServicesGlobalDataModule,
    private dataService: SharedServicesDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) {}

  ngOnInit(): void {
    this.global.setHeaderTitle('User Creation');

    this.roleID = this.global.getRoleId();
    this.global.setHeaderTitle('User Profile');
    this.getRoles();
    this.getUser();

    this.getCompany();
  }

  getCompany() {
    this.dataService.getHttp('cmis-api/Company/getCompany', '').subscribe(
      (response: any) => {
        this.companyList = response;
        if (this.global.getRoleId() != 1) {
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
    if (this.global.getRoleId() == 1) {
      companyID = this.formFields[6].value;
    } else {
      companyID = this.global.getCompanyID();
    }
    if (companyID > 0) {
      this.dataService
        .getHttp('cmis-api/Business/getBusiness?companyID=' + companyID, '')
        .subscribe(
          (response: any) => {
            this.businessList = response;
            if (this.global.getRoleId() != 1) {
              this.formFields[6].value = this.global.getCompanyID();
              this.getBranch();
            }
          },
          (error: any) => {
            console.log(error);
          }
        );
    }
  }

  getBranch() {
    var businessID = 0;
    if (this.global.getRoleId() == 1) {
      businessID = this.formFields[9].value;
    } else {
      businessID = this.global.getBusinessID();
      if (this.formFields[9].value == '0') {
        this.formFields[9].value = this.global.getBusinessID();
      }
    }

    this.dataService
      .getHttp('cmis-api/Branch/getBranch?businessID=' + businessID, '')
      .subscribe(
        (response: any) => {
          this.branchList = response;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  getUser() {
    this.dataService
      .getHttp(
        'user-api/User/getUser?companyID=' +
          this.global.getCompanyID() +
          '&businessID=' +
          this.global.getBusinessID(),
        ''
      )
      .subscribe(
        (response: any) => {
          this.userTable.tableData = response;
          this.lblUserCount = response.length;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  getRoles() {
    this.dataService
      .getHttp(
        'user-api/Role/getRoles?businessID=' + this.global.getBusinessID(),
        ''
      )
      .subscribe(
        (response: any) => {
          this.roleList = response;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  save() {
    this.formFields[7].value = '1';
    this.formFields[8].value = new Date();

    if (this.formFields[4].value.length < 8) {
      this.valid.apiInfoResponse('password length is less than 8');
      return;
    }
    if (this.txtConfirmPw == '') {
      this.valid.apiInfoResponse('enter confirm password');
      return;
    }
    if (this.formFields[4].value != this.txtConfirmPw) {
      this.valid.apiInfoResponse('password not matched');
      return;
    }

    if (this.formFields[0].value == 0) {
      this.dataService
        .savetHttp(this.pageFields, this.formFields, 'user-api/User/saveUser')
        .subscribe(
          (response: any) => {
            console.log(response);
            if (response.message == 'Success') {
              this.valid.apiInfoResponse('User created successfully');
              this.getUser();
              this.reset();
            } else {
              this.valid.apiErrorResponse(response[0]);
            }
          },
          (error: any) => {
            this.error = error;
            this.valid.apiErrorResponse(this.error);
          }
        );
    } else {
      this.dataService
        .savetHttp(this.pageFields, this.formFields, 'user-api/User/updateUser')
        .subscribe(
          (response: any) => {
            console.log(response);
            if (response.message == 'Success') {
              this.valid.apiInfoResponse('User updated successfully');
              this.getUser();
              this.reset();
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

  reset() {
    this.formFields = this.valid.resetFormFields(this.formFields);
    this.formFields[0].value = '0';
    this.formFields[6].value = '0';
    this.formFields[9].value = '0';
    this.businessList = [];
    this.branchList = [];
    this.txtConfirmPw = '';
    this.getCompany();
  }

  edit(item: any) {
    $('#userModal').modal('show');

    console.log(item);
    this.formFields[6].value = item.companyID;

    this.getCompany();
    this.getBusiness();
    this.getBranch();
    this.formFields[0].value = item.userID;
    this.formFields[2].value = item.empName;
    this.formFields[3].value = item.loginName;
    this.formFields[5].value = item.roleId;
    this.formFields[9].value = item.businessID;
    this.formFields[10].value = item.branchID;
  }

  delete(item: any) {
    this.reset();

    setTimeout(() => this.getUser(), 200);
  }
}
