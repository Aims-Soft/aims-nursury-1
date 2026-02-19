import { SharedHelpersFieldValidationsModule } from '@aims-pos/shared/helpers/field-validations';
import { MyFormField, PartyInterface } from '@aims-pos/shared/interface';
import { SharedServicesDataModule } from '@aims-pos/shared/services/data';
import { SharedServicesGlobalDataModule } from '@aims-pos/shared/services/global-data';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PartyTableComponent } from './party-table/party-table.component';

@Component({
  selector: 'aims-pos-party',
  templateUrl: './party.component.html',
  styleUrls: ['./party.component.scss'],
})
export class PartyComponent implements OnInit {
  @ViewChild(PartyTableComponent) partyTable: any;

  roleID: any = 0;
  citySearch: any;

  pageFields: PartyInterface = {
    partyID: '0', //0
    userID: '', //1
    type: '', //2
    partyName: '', //3
    partyNameUrdu: '', //4
    cnic: '', //5
    address: '', //6
    addressUrdu: '', //7
    cityID: '', //8
    phone: '', //9
    mobile: '', //10
    focalPerson: '', //11
    description: '', //12
    companyid: '', //13
    businessid: '', //14
    moduleId: '', //15
    branchID: '', //16
  };

  formFields: MyFormField[] = [
    {
      value: this.pageFields.partyID,
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
      value: this.pageFields.type,
      msg: 'select party type',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFields.partyName,
      msg: 'enter party name',
      type: 'textbox',
      required: true,
    },
    {
      value: this.pageFields.partyNameUrdu,
      msg: 'enter party name urdu',
      type: 'textbox',
      required: false,
    },
    {
      value: this.pageFields.cnic,
      msg: 'enter cnic',
      type: 'cnic',
      required: true,
    },
    {
      value: this.pageFields.address,
      msg: 'enter address',
      type: 'textbox',
      required: true,
    },
    {
      value: this.pageFields.addressUrdu,
      msg: 'enter address urdu',
      type: 'textbox',
      required: false,
    },
    {
      value: this.pageFields.cityID,
      msg: 'select city',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFields.phone,
      msg: 'enter phone',
      type: 'phone',
      required: false,
    },
    {
      value: this.pageFields.mobile,
      msg: 'enter mobile',
      type: 'mobile',
      required: true,
    },
    {
      value: this.pageFields.focalPerson,
      msg: 'enter person to contact',
      type: 'textbox',
      required: false,
    },
    {
      value: this.pageFields.description,
      msg: 'enter remarks',
      type: 'textbox',
      required: false,
    },
    {
      value: this.pageFields.companyid,
      msg: '',
      type: 'selectbox',
      required: false,
    },
    {
      value: this.pageFields.businessid,
      msg: '',
      type: 'selectbox',
      required: false,
    },
    {
      value: this.pageFields.moduleId,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFields.branchID,
      msg: '',
      type: 'hidden',
      required: false,
    },
  ];

  companyList: any = [];
  businessList: any = [];
  cityList: any = [];

  tabIndex = 0;
  error: any;

  cnicMask = this.globalService.cnicMask();
  mobileMask = this.globalService.mobileMask();
  phoneMask = this.globalService.phoneMask();
  moduleId: string | null;
  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) {}

  ngOnInit(): void {
    this.formFields[1].value = this.globalService.getUserId().toString();
    this.moduleId = localStorage.getItem('moduleId');
    this.formFields[15].value = localStorage.getItem('moduleId');
    this.formFields[16].value = this.globalService.getBranchID();
    this.roleID = this.globalService.getRoleId();
    this.getCompany();
    this.getCity();
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
      companyID = this.formFields[13].value;
    } else {
      companyID = this.globalService.getCompanyID();
    }
    this.dataService
      .getHttp('cmis-api/Business/getBusiness?companyID=' + companyID, '')
      .subscribe(
        (response: any) => {
          this.businessList = response;
          if (this.globalService.getRoleId() != 1) {
            this.formFields[13].value = this.globalService.getCompanyID();
            this.formFields[14].value = this.globalService.getBusinessID();
          }
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  getCity() {
    this.dataService
      .getHttp(
        'core-api/City/getCity?userID=' +
          this.globalService.getUserId() +
          '&moduleId=' +
          this.moduleId,
        ''
      )
      .subscribe(
        (response: any) => {
          this.cityList = response;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  save() {
    if (this.formFields[5].value == '' || this.formFields[4].value == null) {
      this.valid.apiInfoResponse('enter cnic');
      return;
    }

    var strCnic = this.formFields[5].value.replace(/_/g, '');
    if (strCnic.length < 15) {
      this.valid.apiInfoResponse('enter correct cnic');
      return;
    }

    if (this.formFields[10].value == '' || this.formFields[10].value == null) {
      this.valid.apiInfoResponse('enter mobile no');
      return;
    }

    var strMobile = this.formFields[10].value.replace(/_/g, '');
    if (strMobile.length < 12) {
      this.valid.apiInfoResponse('enter correct mobile no');
      return;
    }

    if (this.formFields[9].value != '' || this.formFields[9].value == null) {
      var strPhone = this.formFields[9].value.replace(/_/g, '');
      if (strPhone.length < 11) {
        this.valid.apiInfoResponse('enter correct phone no');
        return;
      }
    }

    this.dataService
      .savetHttp(this.pageFields, this.formFields, 'core-api/Party/saveParty')
      .subscribe(
        (response: any) => {
          console.log(response);
          if (response.message == 'Success') {
            if (this.formFields[0].value == '0') {
              this.valid.apiInfoResponse('Record saved successfully');
            } else {
              this.valid.apiInfoResponse('Record updated successfully');
            }

            this.partyTable.getParty();
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
    this.formFields[3].value = '';
    this.formFields[8].value = '';
    this.formFields[9].value = '';
    this.formFields[10].value = '';
    this.formFields[11].value = '';
    this.formFields[12].value = '';
    this.formFields[13].value = '';
    this.formFields[14].value = '';
  }

  edit(item: any) {
    this.tabIndex = 0;

    this.formFields[0].value = item.partyID;
    this.formFields[2].value = item.type;
    this.formFields[3].value = item.partyName;
    this.formFields[4].value = item.partyNameUrdu;
    this.formFields[5].value = item.cnic;
    this.formFields[6].value = item.address;
    this.formFields[7].value = item.addressUrdu;
    this.formFields[8].value = item.cityID;
    this.formFields[9].value = item.phone;
    this.formFields[10].value = item.mobile;
    this.formFields[11].value = item.focalperson;
    this.formFields[12].value = item.description;
    this.formFields[13].value = item.companyid;
    this.formFields[14].value = item.businessid;
  }

  changeTabHeader(tabNum: any) {
    this.tabIndex = tabNum;
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
