import { SharedHelpersFieldValidationsModule } from '@aims-pos/shared/helpers/field-validations';
import {
  MyFormField,
  PackageInterface,
  SaleInterface,
} from '@aims-pos/shared/interface';
import { SharedServicesDataModule } from '@aims-pos/shared/services/data';
import { SharedServicesGlobalDataModule } from '@aims-pos/shared/services/global-data';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'aims-pos-package-details',
  templateUrl: './package-details.component.html',
  styleUrls: ['./package-details.component.scss'],
})
export class PackageDetailsComponent implements OnInit {
  productList: any;
  packageList: any;
  packageDetailList: any;

  searchProduct: any;
  cmbProduct: any;

  error: any;
  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule,
    public datepipe: DatePipe
  ) {}

  pageFields: PackageInterface = {
    packageID: '0', //0
    userID: '', //1
    packageTitle: '', //2
    json: '', //3
    packageDate: '', //4
    businessID: '', //5
    companyID: '', //6
    branchID: '', //7
    moduleId: '', //8
    barcode: '', //9
  };
  formFields: MyFormField[] = [
    {
      value: this.pageFields.packageID,
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
      value: this.pageFields.packageTitle,
      msg: 'enter package title',
      type: 'textbox',
      required: true,
    },
    {
      value: this.pageFields.json,
      msg: 'select product',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFields.packageDate,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFields.businessID,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFields.companyID,
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
    {
      value: this.pageFields.moduleId,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFields.barcode,
      msg: 'enter barcode',
      type: 'textbox',
      required: true,
    },
  ];

  ngOnInit(): void {
    this.formFields[1].value = this.globalService.getUserId().toString();
    this.formFields[4].value = this.datepipe.transform(
      new Date(),
      'yyyy-MM-dd'
    );
    this.formFields[5].value = this.globalService.getBusinessID();
    this.formFields[6].value = this.globalService.getCompanyID();
    this.formFields[7].value = this.globalService.getBranchID();
    this.formFields[8].value = localStorage.getItem('moduleId');
    this.globalService.setHeaderTitle('Package');

    this.getPackageList();
    this.getProduct();
  }
  getPackageList() {
    this.dataService
      .getHttp(
        'core-api/Package/getPackages?businessID=' +
          this.globalService.getBusinessID() +
          '&companyID=' +
          this.globalService.getCompanyID() +
          '&userID=' +
          this.globalService.getUserId() +
          '&moduleId=' +
          localStorage.getItem('moduleId'),
        ''
      )
      .subscribe(
        (response: any) => {
          console.log(response);
          this.packageList = response;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  getPackageDetails(packageID: any) {
    this.dataService
      .getHttp(
        'core-api/Product/getProductOfPackage?branchID=' +
          this.globalService.getBranchID() +
          '&companyID=' +
          this.globalService.getCompanyID() +
          '&userID=' +
          this.globalService.getUserId() +
          '&moduleId=' +
          localStorage.getItem('moduleId') +
          '&packageID=' +
          packageID,
        ''
      )
      .subscribe(
        (response: any) => {
          console.log(response);
          this.packageDetailList = response;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  getProduct() {
    this.dataService
      .getHttp(
        'core-api/Product/getpackageProduct?companyID=' +
          this.globalService.getCompanyID() +
          '&branchID=' +
          this.globalService.getBranchID() +
          '&userID=' +
          this.globalService.getUserId() +
          '&moduleId=' +
          localStorage.getItem('moduleId'),
        ''
      )
      .subscribe(
        (response: any) => {
          // this.productList = response;
          this.productList = [];

          for (var i = 0; i < response.length; i++) {
            var img = '';
            if (response[i].applicationedoc == '') {
              img =
                'http://localhost:7060/assets/ui/productPictures2/noImage.png';
              // img =
              //   'https://image.sungreenfresh.com:7061/assets/ui/productPictures/noImage.png';
            } else {
              img =
                'http://localhost:7060/assets/ui/productPictures/' +
                response[i].productID +
                '.png';
            }

            this.productList.push({
              barcode1: response[i].barcode1,
              barcode2: response[i].barcode2,
              barcode3: response[i].barcode3,
              availableqty: response[i].qty,
              qty: response[i].qty,
              costPrice: response[i].costPrice,
              invoiceDate: response[i].invoiceDate,
              pPriceID: response[i].pPriceID,
              productID: response[i].productID,
              productName: response[i].productName,
              salePrice: response[i].salePrice,
              imgUrl: img,
              locationID: response[i].locationID,
              packing: response[i].packing,
              packingSalePrice: response[i].packingSalePrice,
            });
          }
        },
        (error: any) => {
          console.log(error);
        }
      );
  }
  jsonList: any[] = [];
  getProductById(productId: number) {
    console.log(
      this.productList.find((product: any) => product.productID === productId)
    );
  }

  jsonFunc(item: any | any[]) {
    if (Array.isArray(item)) {
      for (let i = 0; i < item.length; i++) {
        this.jsonList.push({
          productID: item[i],
        });
      }
    } else {
      this.jsonList.push({
        productID: item,
      });
    }
  }
  edit(item: any) {
    console.log(item);
    this.getProductById(item.productID);
    this.formFields[0].value = item.packageID;
    this.formFields[2].value = item.packageTitle;
    this.formFields[3].value = item.productID;
    this.formFields[9].value = item.barcode;
  }

  save() {
    this.formFields[3].value = JSON.stringify(this.jsonList);
    this.dataService
      .savetHttp(
        this.pageFields,
        this.formFields,
        'core-api/Package/savePackage'
      )
      .subscribe(
        (response: any) => {
          // console.log(response);
          if (response.message == 'Success') {
            // this.getCounterdetails();
            this.getProduct();
            this.getPackageList();
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

  delete(item: any) {
    var pageField = {
      packageTitle: '',
      packageID: '0',
      userID: '',
      moduleId: '',
    };
    var formField: MyFormField[] = [
      {
        value: pageField.packageTitle,
        msg: '',
        type: 'hidden',
        required: false,
      },
      {
        value: pageField.packageID,
        msg: '',
        type: 'hidden',
        required: false,
      },
      {
        value: pageField.userID,
        msg: '',
        type: 'hidden',
        required: false,
      },
      {
        value: pageField.moduleId,
        msg: '',
        type: 'hidden',
        required: false,
      },
    ];
    formField[0].value = item.packageTitle;
    formField[1].value = item.packageID;
    formField[2].value = this.globalService.getUserId().toString();
    formField[3].value = localStorage.getItem('moduleId');
    this.dataService
      .deleteHttp(pageField, formField, 'core-api/Package/deletePackage')
      .subscribe(
        (response: any) => {
          // console.log(response);
          if (response.message == 'Success') {
            this.getProduct();
            this.getPackageList();
            this.valid.apiInfoResponse('Record deleted successfully');
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
