import { SharedHelpersFieldValidationsModule } from '@aims-pos/shared/helpers/field-validations';
import {
  MyFormField,
  OpeningBalanceInterface,
} from '@aims-pos/shared/interface';
import { SharedServicesDataModule } from '@aims-pos/shared/services/data';
import { SharedServicesGlobalDataModule } from '@aims-pos/shared/services/global-data';
import { Component, OnInit, ViewChild } from '@angular/core';
import { OpeningBalanceTableComponent } from './opening-balance-table/opening-balance-table.component';

@Component({
  selector: 'aims-pos-opening-balance',
  templateUrl: './opening-balance.component.html',
  styleUrls: ['./opening-balance.component.scss'],
})
export class OpeningBalanceComponent implements OnInit {
  @ViewChild(OpeningBalanceTableComponent) openingBalanceTable: any;

  searchProduct: any = '';
  searchCategory: any = '';

  lblCostPrice: any = 0;
  lblTotal: any = 0;
  tblSearch: any = '';

  cmbCategory: any = '';
  cmbCompany: any = '';
  cmbBusiness: any = '';
  cmbBranch: any = '';

  roleID: any = 0;

  // pageFields: OpeningBalanceInterface = {
  //   invoiceDate: '',
  //   userID: '',
  //   productID: '0',
  //   locationID: '0',
  //   costPrice: '0',
  //   salePrice: '',
  //   qty: '0',
  //   debit: '0',
  //   productName: '',
  // };

  // formFields: MyFormField[] = [
  //   {
  //     value: this.pageFields.invoiceDate,
  //     msg: 'enter date',
  //     type: 'date',
  //     required: true,
  //   },
  //   {
  //     value: this.pageFields.userID,
  //     msg: '',
  //     type: 'hidden',
  //     required: false,
  //   },
  //   {
  //     value: this.pageFields.productID,
  //     msg: 'select product',
  //     type: 'selectBox',
  //     required: true,
  //   },
  //   {
  //     value: this.pageFields.locationID,
  //     msg: '',
  //     type: '',
  //     required: false,
  //   },
  //   {
  //     value: this.pageFields.costPrice,
  //     msg: '',
  //     type: '',
  //     required: false,
  //   },
  //   {
  //     value: this.pageFields.salePrice,
  //     msg: '',
  //     type: '',
  //     required: false,
  //   },
  //   {
  //     value: this.pageFields.qty,
  //     msg: 'enter quantity',
  //     type: 'textBox',
  //     required: true,
  //   },
  //   {
  //     value: this.pageFields.debit,
  //     msg: '',
  //     type: '',
  //     required: false,
  //   },
  //   {
  //     value: this.pageFields.productName,
  //     msg: '',
  //     type: '',
  //     required: false,
  //   }
  // ];

  error: any;

  companyList: any = [];
  businessList: any = [];
  branchList: any = [];
  productList: any = [];
  categoryList: any = [];
  tableData: any = [];
  moduleId: string | null;
  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) {}

  ngOnInit(): void {
    // this.globalService.setHeaderTitle("Opening Balance");
    // this.formFields[2].value = this.globalService.getUserId().toString();

    // this.getProduct();
    this.moduleId = localStorage.getItem('moduleId');
    this.roleID = this.globalService.getRoleId();
    this.getCompany();
    this.getCategory();
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
      companyID = this.cmbCompany;
    } else {
      companyID = this.globalService.getCompanyID();
    }
    this.dataService
      .getHttp('cmis-api/Business/getBusiness?companyID=' + companyID, '')
      .subscribe(
        (response: any) => {
          this.businessList = response;
          if (this.globalService.getRoleId() != 1) {
            this.cmbCompany = this.globalService.getCompanyID();
            this.cmbBusiness = this.globalService.getBusinessID();
            this.getBranch();
          }
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  getBranch() {
    var businessID = 0;
    if (this.globalService.getRoleId() == 1) {
      businessID = this.cmbBusiness;
    } else {
      businessID = this.globalService.getBusinessID();
      if (this.cmbBusiness == '') {
        this.cmbBusiness = this.globalService.getBusinessID();
      }
    }

    this.dataService
      .getHttp('cmis-api/Branch/getBranch?businessID=' + businessID, '')
      .subscribe(
        (response: any) => {
          this.branchList = response;
          if (this.globalService.getRoleId() != 1) {
            this.cmbBranch = this.globalService.getBranchID();
          }
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  getCategory() {
    this.dataService
      .getHttp(
        'core-api/Category/getCategory?companyID=' +
          this.globalService.getCompanyID() +
          '&businessID=' +
          this.globalService.getBusinessID() +
          '&userID=' +
          this.globalService.getUserId() +
          '&moduleId=' +
          this.moduleId,
        ''
      )
      .subscribe(
        (response: any) => {
          console.log(response);
          this.getSubCategory(response[0].categoryID);
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  getSubCategory(item: any) {
    this.dataService
      .getHttp(
        'core-api/Category/getSubCategory?companyID=' +
          this.globalService.getCompanyID() +
          '&businessID=' +
          this.globalService.getBusinessID() +
          '&catID=' +
          item +
          '&userID=' +
          this.globalService.getUserId() +
          '&moduleId=' +
          this.moduleId,
        ''
      )
      .subscribe(
        (response: any) => {
          this.categoryList = response;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  // getProduct(){
  //   this.dataService.getHttp('core-api/Product/getProduct', '').subscribe((response: any) => {
  //     this.productList = response;
  //   }, (error: any) => {
  //     console.log(error);
  //   });
  // }

  onCategoryChange(item: any) {
    this.tblSearch = '';

    this.dataService
      .getHttp(
        'core-api/OpeningBalance/getOpeningBalanceProduct?companyID=' +
          this.globalService.getCompanyID() +
          '&businessID=' +
          this.globalService.getBusinessID() +
          '&branchID=' +
          this.globalService.getBranchID() +
          '&categoryID=' +
          item +
          '&userID=' +
          this.globalService.getUserId() +
          '&moduleId=' +
          this.moduleId,
        ''
      )
      .subscribe(
        (response: any) => {
          this.tableData = response;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  // onProductChange(item: any){

  //   var data = this.productList.filter((x: {productID: any}) => x.productID == item);

  //   this.formFields[3].value = data[0].locationID;
  //   this.formFields[4].value = data[0].costPrice;
  //   this.formFields[5].value = data[0].salePrice;
  //   this.formFields[8].value = data[0].productName;

  //   this.lblTotal = this.formFields[4].value * this.formFields[6].value;
  // }

  // changeValue(){
  //   this.lblTotal = this.formFields[4].value * this.formFields[6].value;
  // }

  save(item: any) {
    var pageFields = {
      invoiceNo: '0', //0
      invoiceDate: '', //1
      userID: '', //2
      productID: '0', //3
      locationID: '0', //4
      costPrice: '0', //5
      salePrice: '', //6
      qty: '0', //7
      debit: '0', //8
      productName: '', //9
      companyid: '', //10
      businessid: '', //11
      branchid: '', //12
      moduleId: '', //13
    };

    var formFields: MyFormField[] = [
      {
        value: pageFields.invoiceNo,
        msg: '',
        type: 'hidden',
        required: false,
      },
      {
        value: pageFields.invoiceDate,
        msg: '',
        type: 'date',
        required: false,
      },
      {
        value: pageFields.userID,
        msg: '',
        type: 'hidden',
        required: false,
      },
      {
        value: pageFields.productID,
        msg: '',
        type: 'selectBox',
        required: false,
      },
      {
        value: pageFields.locationID,
        msg: '',
        type: '',
        required: false,
      },
      {
        value: pageFields.costPrice,
        msg: '',
        type: '',
        required: false,
      },
      {
        value: pageFields.salePrice,
        msg: '',
        type: '',
        required: false,
      },
      {
        value: pageFields.qty,
        msg: 'enter quantity',
        type: 'textBox',
        required: true,
      },
      {
        value: pageFields.debit,
        msg: '',
        type: '',
        required: false,
      },
      {
        value: pageFields.productName,
        msg: '',
        type: '',
        required: false,
      },
      {
        value: pageFields.companyid,
        msg: '',
        type: '',
        required: false,
      },
      {
        value: pageFields.businessid,
        msg: '',
        type: '',
        required: false,
      },
      {
        value: pageFields.branchid,
        msg: '',
        type: '',
        required: false,
      },
      {
        value: pageFields.moduleId,
        msg: '',
        type: '',
        required: false,
      },
    ];

    formFields[0].value = item.invoiceNo;
    formFields[1].value = new Date();
    formFields[2].value = this.globalService.getUserId().toString();
    formFields[3].value = item.productID;
    formFields[4].value = item.locationID;
    formFields[5].value = item.costPrice;
    formFields[6].value = item.salePrice;
    formFields[7].value = item.qty;
    formFields[8].value = formFields[5].value * formFields[6].value;
    formFields[9].value = item.productName;
    formFields[10].value = this.cmbCompany;
    formFields[11].value = this.cmbBusiness;
    formFields[12].value = this.cmbBranch;
    formFields[13].value = localStorage.getItem('moduleId');

    this.dataService
      .savetHttp(pageFields, formFields, 'core-api/OpeningBalance/saveBalance')
      .subscribe(
        (response: any) => {
          console.log(response);
          if (response.message == 'Success') {
            this.valid.apiInfoResponse('Record saved successfully');

            this.onCategoryChange(this.cmbCategory);
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
    // this.formFields = this.valid.resetFormFields(this.formFields);

    // this.formFields[3].value = '0';
    // this.formFields[4].value = '0';
    // this.formFields[5].value = '';
    // this.formFields[7].value = '0';
    // this.formFields[8].value = '';

    this.searchProduct = '';
    // this.lblTotal = 0;
  }

  getKeyPressed(e: any) {
    if (e.keyCode == 13) {
      // this.save();
    }
  }
}
