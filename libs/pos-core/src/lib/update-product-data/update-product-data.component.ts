import { SharedHelpersFieldValidationsModule } from '@aims-pos/shared/helpers/field-validations';
import { MyFormField } from '@aims-pos/shared/interface';
import { SharedServicesDataModule } from '@aims-pos/shared/services/data';
import { SharedServicesGlobalDataModule } from '@aims-pos/shared/services/global-data';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'aims-pos-update-product-data',
  templateUrl: './update-product-data.component.html',
  styleUrls: ['./update-product-data.component.scss'],
})
export class UpdateProductDataComponent implements OnInit {
  tblSearch: any = '';
  cmbCategory: any = '';
  searchCategory: any = '';

  error: any;
  tableData: any = [];
  tempList: any = [];
  brandList: any = [];
  categoryList: any = [];
  moduleId: string | null;
  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule,
    private datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.moduleId = localStorage.getItem('moduleId');
    this.getBrand();
    this.getCategory();

    // this.getTopFKProducts();
    // this.getTopTKProducts();
    // this.getTopOKProducts();
    // this.getTopFHProducts();
    // this.getTopProducts();
  }

  getBrand() {
    this.dataService
      .getHttp(
        'core-api/Brand/getBrand?userID=' +
          this.globalService.getUserId() +
          '&moduleId=' +
          this.moduleId,
        ''
      )
      .subscribe(
        (response: any) => {
          this.brandList = response;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  getCategory() {
    this.dataService
      .getHttp(
        'core-api/Category/getSubCategory?catID=1' +
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

  // getTopFKProducts(){
  //   this.dataService.getHttp('core-api/Product/getTopFKProducts', '').subscribe((response: any) => {
  //     this.tableData = this.tableData.concat(response);
  //   }, (error: any) => {
  //     console.log(error);
  //   });
  // }

  onCategoryChange(item: any) {
    this.tblSearch = '';

    this.dataService
      .getHttp(
        'core-api/Product/getProductByCategory?categoryID=' +
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

  // getTopProducts(){
  //   this.dataService.getHttp('core-api/Product/getTopProducts', '').subscribe((response: any) => {
  //     this.tableData = response;
  //     // alert(response.length)
  //   }, (error: any) => {
  //     console.log(error);
  //   });
  // }

  // getTopFHProducts(){
  //   this.dataService.getHttp('core-api/Product/getTopFHProducts', '').subscribe((response: any) => {
  //     this.tableData = this.tableData.concat(response);
  //     // alert('five H')
  //   }, (error: any) => {
  //     console.log(error);
  //   });
  // }

  // getTopTKProducts(){
  //   this.dataService.getHttp('core-api/Product/getTopTKProducts', '').subscribe((response: any) => {
  //     this.tableData = this.tableData.concat(response);
  //     // alert('two k')
  //   }, (error: any) => {
  //     console.log(error);
  //   });
  // }

  // getTopOKProducts(){
  //   this.dataService.getHttp('core-api/Product/getTopOKProducts', '').subscribe((response: any) => {
  //     this.tableData = this.tableData.concat(response);
  //     // alert('one k')
  //   }, (error: any) => {
  //     console.log(error);
  //   });
  // }

  edit(item: any) {
    var pageFields = {
      productID: '0',
      brandID: '0',
      costPrice: '0',
      salePrice: '0',
      userID: '',
    };

    var formFields: MyFormField[] = [
      {
        value: pageFields.productID,
        msg: '',
        type: 'hidden',
        required: false,
      },
      {
        value: pageFields.brandID,
        msg: '',
        type: 'hidden',
        required: false,
      },
      {
        value: pageFields.costPrice,
        msg: '',
        type: 'hidden',
        required: false,
      },
      {
        value: pageFields.salePrice,
        msg: '',
        type: 'hidden',
        required: false,
      },
      {
        value: pageFields.userID,
        msg: '',
        type: 'hidden',
        required: false,
      },
    ];

    formFields[0].value = item.productID;
    formFields[1].value = item.brandID;
    formFields[2].value = item.costPrice;
    formFields[3].value = item.salePrice;
    formFields[4].value = this.globalService.getUserId().toString();

    this.dataService
      .deleteHttp(
        pageFields,
        formFields,
        'core-api/Product/updateProductPrice?userID=' +
          this.globalService.getUserId() +
          '&moduleId=' +
          this.moduleId
      )
      .subscribe(
        (response: any) => {
          if (response.message == 'Success') {
            this.valid.apiInfoResponse('Record updated successfully');
            // this.getTopProducts();
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

  reset() {
    this.tblSearch = '';
    this.cmbCategory = '';
    this.tableData = [];
  }
}
