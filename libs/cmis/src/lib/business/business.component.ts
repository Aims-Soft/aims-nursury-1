import { SharedHelpersFieldValidationsModule } from '@aims-pos/shared/helpers/field-validations';
import { BusinessInterface, MyFormField } from '@aims-pos/shared/interface';
import { SharedServicesDataModule } from '@aims-pos/shared/services/data';
import { SharedServicesGlobalDataModule } from '@aims-pos/shared/services/global-data';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CompanyImageUploadingComponent } from '../company/company-image-uploading/company-image-uploading.component';
import { BusinessTableComponent } from './business-table/business-table.component';
import { environment } from 'apps/aims-pos/src/environments/environment';

@Component({
  selector: 'aims-pos-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss'],
})
export class BusinessComponent implements OnInit {
  @ViewChild(BusinessTableComponent) businessTable: any;
  @ViewChild(CompanyImageUploadingComponent) imageUpload: any;

  productPic: any;
  tabIndex = 0;
  error: any;

  pageFields: BusinessInterface = {
    businessID: '0', // 0
    userID: '', // 1
    companyID: '', // 2
    businessShortName: '', // 3
    businessFullName: '', // 4
    email: '', // 5
    mobileNo: '', // 6
    phoneNo: '', // 7
    businessAddress: '', // 8
    businessEDoc: '', // 9
    businessEDocPath: '', // 10
    businessEDocExtenstion: '', // 11
  };

  formFields: MyFormField[] = [
    {
      value: this.pageFields.businessID,
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
      value: this.pageFields.companyID,
      msg: 'select company',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFields.businessShortName,
      msg: 'enter business short name',
      type: 'name',
      required: true,
    },
    {
      value: this.pageFields.businessFullName,
      msg: 'enter business full name',
      type: 'name',
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
      value: this.pageFields.businessAddress,
      msg: 'enter address',
      type: 'textbox',
      required: true,
    },
    {
      value: this.pageFields.businessEDoc,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.businessEDocPath,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFields.businessEDocExtenstion,
      msg: '',
      type: 'hidden',
      required: false,
    },
  ];

  companyList: any = [];

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

    this.getCompany();
  }

  getCompany() {
    this.dataService.getHttp('cmis-api/Company/getCompany', '').subscribe(
      (response: any) => {
        this.companyList = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  save() {
    if (this.imageUpload.image != undefined && this.imageUpload.image != '') {
      this.formFields[9].value = this.imageUpload.image;
      this.formFields[11].value = this.imageUpload.imageExt;

      this.formFields[10].value = environment.imageUrl + 'business';
    } else {
      this.formFields[9].value = '';
      this.formFields[10].value = '';
      this.formFields[11].value = '';
    }

    if (this.formFields[0].value == '0') {
      this.dataService
        .savetHttp(
          this.pageFields,
          this.formFields,
          'cmis-api/Business/saveBusiness'
        )
        .subscribe(
          (response: any) => {
            console.log(response);
            if (response.message == 'Success') {
              this.valid.apiInfoResponse('Record saved successfully');

              this.businessTable.getBusiness();
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
          'cmis-api/Business/updateBusiness'
        )
        .subscribe(
          (response: any) => {
            console.log(response);
            if (response.message == 'Success') {
              this.valid.apiInfoResponse('Record updated successfully');

              this.businessTable.getBusiness();
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
    this.formFields[9].value = '';
    this.formFields[10].value = '';
    this.formFields[11].value = '';
  }

  edit(item: any) {
    console.log(item);
    // return;
    this.tabIndex = 0;

    this.formFields[0].value = item.businessID;
    this.formFields[2].value = item.companyID;

    this.formFields[3].value = item.businessShortName;
    this.formFields[4].value = item.businessFullName;

    this.formFields[5].value = item.email;
    this.formFields[6].value = item.mobileNo;

    this.formFields[7].value = item.phoneNo;
    this.formFields[8].value = item.businessAddress;

    if (item.businessedoc != null) {
      this.productPic =
        'http://135.181.62.34:7060/assets/ui/business/' +
        item.businessID +
        '.png';
    }
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
