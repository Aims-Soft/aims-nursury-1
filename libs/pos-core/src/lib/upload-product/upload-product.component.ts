import { SharedHelpersFieldValidationsModule } from '@aims-pos/shared/helpers/field-validations';
import {
  MyFormField,
  UploadProductInterface,
} from '@aims-pos/shared/interface';
import { SharedServicesDataModule } from '@aims-pos/shared/services/data';
import { SharedServicesGlobalDataModule } from '@aims-pos/shared/services/global-data';
import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'aims-pos-upload-product',
  templateUrl: './upload-product.component.html',
  styleUrls: ['./upload-product.component.scss'],
})
export class UploadProductComponent implements OnInit {
  roleID: any = 0;
  searchUser: any = '';

  pageFields: UploadProductInterface = {
    json: '', //0
    userID: '', //1
    companyID: '', //2
    businessID: '', //3
    branchID: '', //4
    moduleId: '', //5
  };

  formFields: MyFormField[] = [
    {
      value: this.pageFields.json,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFields.userID,
      msg: 'select user',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFields.companyID,
      msg: 'select company',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFields.businessID,
      msg: 'select business',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFields.branchID,
      msg: 'select branch',
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

  userList: any = [];
  companyList: any = [];
  businessList: any = [];
  branchList: any = [];

  base64Str: any;
  excelData: any = [];
  importedDataList: any = [];

  error: any;
  constructor(
    private global: SharedServicesGlobalDataModule,
    private dataService: SharedServicesDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) {}

  ngOnInit(): void {
    this.roleID = this.global.getRoleId();
    this.formFields[5].value = localStorage.getItem('moduleId');

    this.getUser();
    this.getCompany();
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
          this.userList = response;
        },
        (error: any) => {
          console.log(error);
        }
      );
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

  getBusiness() {
    this.dataService
      .getHttp(
        'cmis-api/Business/getBusiness?companyID=' + this.formFields[2].value,
        ''
      )
      .subscribe(
        (response: any) => {
          this.businessList = response;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  getBranch() {
    this.dataService
      .getHttp(
        'cmis-api/Branch/getBranch?businessID=' + this.formFields[3].value,
        ''
      )
      .subscribe(
        (response: any) => {
          console.log(response);
          this.branchList = response;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }
  // getBase64(file: any): Promise<string> {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => {
  //       const base64Str = (reader.result as string).split(',')[1];
  //       resolve(base64Str);
  //     };
  //     reader.onerror = (error) => {
  //       console.log('Error: ', error);
  //       reject(error);
  //     };
  //   });
  // }

  importDataExcel(event: any) {
    this.importedDataList = [];
    this.excelData = [];

    let file = event.target.files[0];

    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);

    fileReader.onload = (e) => {
      var workBook = XLSX.read(fileReader.result, {
        type: 'binary',
        cellDates: true,
      });
      var sheetNames = workBook.SheetNames;

      this.excelData = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]]);

      //setting max char limit
      const maxLength = 20;

      for (var i = 0; i < this.excelData.length; i++) {
        // for (var i = 3; i < 4; i++) {
        const costPrice = parseFloat(this.excelData[i].cost_price);
        const salePrice = parseFloat(this.excelData[i].sale_price);
        if (isNaN(costPrice)) {
          this.valid.apiInfoResponse('cost price is not correct');
        } else if (isNaN(salePrice)) {
          this.valid.apiInfoResponse('sale price is not correct');
        } else {
          this.importedDataList.push({
            product_category: this.excelData[i].product_category,
            product_sub_category: this.excelData[i].product_sub_category,
            product_name: this.excelData[i].product_name.substring(0, 50),
            cost_price: costPrice,
            sale_price: salePrice,
            product_barcode: this.excelData[i].product_barcode,
          });
        }
      }
      this.formFields[0].value = JSON.stringify(this.importedDataList);
    };
  }

  save() {
    // this.formFields[1].value = '9';
    // this.formFields[4].value = '4';
    // this.formFields[3].value = '3';

    this.dataService
      .savetHttp(
        this.pageFields,
        this.formFields,
        // 'core-api/Product/saveProductImport'
        // 'core-api/Product/saveProductFromExcel'
        'core-api/Product/saveProductFromJson'
      )
      .subscribe(
        (response: any) => {
          console.log(response);
          if (response.message == -1) {
            this.valid.apiInfoResponse('Record saved successfully');
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

    this.excelData = [];
    this.importedDataList = [];
    this.businessList = [];
    this.branchList = [];
  }
}
