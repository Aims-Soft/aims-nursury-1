import { SharedServicesDataModule } from '@aims-pos/shared/services/data';
import { SharedServicesGlobalDataModule } from '@aims-pos/shared/services/global-data';
import { SharedHelpersFieldValidationsModule } from '@aims-pos/shared/helpers/field-validations';
import { CompanyInterface, MyFormField } from '@aims-pos/shared/interface';
import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'apps/aims-pos/src/environments/environment';
import { CompanyTableComponent } from './company-table/company-table.component';
import { CompanyImageUploadingComponent } from './company-image-uploading/company-image-uploading.component';

@Component({
  selector: 'aims-pos-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
})
export class CompanyComponent implements OnInit {
  @ViewChild(CompanyTableComponent) companyTable: any;
  @ViewChild(CompanyImageUploadingComponent) imageUpload: any;

  productPic: any;
  tabIndex = 0;
  error: any;

  pageFields: CompanyInterface = {
    companyID: '0', // 0
    userID: '', // 1
    companyFullName: '', // 2
    companyShortName: '', // 3
    companyNtn: '', // 4
    companyStrn: '', // 5
    companyRegistrationNo: '', // 6
    companyAddress: '', // 7
    email: '', // 8
    mobileNo: '', // 9
    phoneNo: '', // 10
    companyEDoc: '', // 11
    companyEDocPath: '', // 12
    companyEDocExtenstion: '', // 13
  };

  formFields: MyFormField[] = [
    {
      value: this.pageFields.companyID,
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
      value: this.pageFields.companyFullName,
      msg: 'enter company full name',
      type: 'name',
      required: true,
    },
    {
      value: this.pageFields.companyShortName,
      msg: 'enter company short name',
      type: 'name',
      required: true,
    },
    {
      value: this.pageFields.companyNtn,
      msg: 'enter ntn',
      type: 'number',
      required: true,
    },
    {
      value: this.pageFields.companyStrn,
      msg: 'enter strn',
      type: 'number',
      required: true,
    },
    {
      value: this.pageFields.companyRegistrationNo,
      msg: 'enter company registration no',
      type: 'textbox',
      required: true,
    },
    {
      value: this.pageFields.companyAddress,
      msg: 'enter address',
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
      value: this.pageFields.companyEDoc,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.companyEDocPath,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFields.companyEDocExtenstion,
      msg: '',
      type: 'hidden',
      required: false,
    },
  ];

  mobileMask = this.globalService.mobileMask();
  phoneMask = this.globalService.phoneMask();

  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) {}

  ngOnInit(): void {
    this.formFields[1].value = this.globalService.getUserId().toString();
    this.productPic =
      'https://icons.veryicon.com/png/o/application/applet-1/product-17.png';
  }

  save() {
    if (this.imageUpload.image != undefined && this.imageUpload.image != '') {
      this.formFields[11].value = this.imageUpload.image;
      this.formFields[13].value = this.imageUpload.imageExt;

      this.formFields[12].value = environment.imageUrl + 'company';
    } else {
      this.formFields[13].value = '';
      this.formFields[11].value = '';
      this.formFields[12].value = '';
    }
    if (this.formFields[0].value == '0') {
      this.dataService
        .savetHttp(
          this.pageFields,
          this.formFields,
          'cmis-api/Company/saveCompany'
        )
        .subscribe(
          (response: any) => {
            console.log(response);
            if (response.message == 'Success') {
              this.valid.apiInfoResponse('Record saved successfully');

              this.companyTable.getCompany();
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
          'cmis-api/Company/updateCompany'
        )
        .subscribe(
          (response: any) => {
            console.log(response);
            if (response.message == 'Success') {
              this.valid.apiInfoResponse('Record updated successfully');

              this.companyTable.getCompany();
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
    this.formFields = this.valid.resetFormFields(this.formFields);

    this.formFields[0].value = '0';
    this.formFields[11].value = '';
    this.formFields[12].value = '';
    this.formFields[13].value = '';
  }

  edit(item: any) {
    // console.log(item);
    // return;
    this.tabIndex = 0;

    this.formFields[0].value = item.companyID;
    this.formFields[2].value = item.companyFullName;

    this.formFields[3].value = item.companyShortName;
    this.formFields[4].value = item.companyNtn;

    this.formFields[5].value = item.companyStrn;
    this.formFields[6].value = item.companyRegistrationNo;

    this.formFields[7].value = item.companyAddress;
    this.formFields[8].value = item.email;

    this.formFields[9].value = item.mobileNo;
    this.formFields[10].value = item.phoneNo;

    if (item.applicationedoc != '') {
      this.productPic =
        'http://135.181.62.34:7060/assets/ui/company/' +
        item.companyID +
        '.png';
    }
    // this.formFields[11].value = item.;
    // this.formFields[12].value = item.;
    // this.formFields[13].value = item.;
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
