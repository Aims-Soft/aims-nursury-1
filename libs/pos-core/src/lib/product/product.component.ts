import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedServicesDataModule } from '@aims-pos/shared/services/data';
import { SharedServicesGlobalDataModule } from '@aims-pos/shared/services/global-data';
import { SharedHelpersFieldValidationsModule } from '@aims-pos/shared/helpers/field-validations';
import { ProductTableComponent } from './product-table/product-table.component';
import { MyFormField, ProductInterface } from '@aims-pos/shared/interface';
import { ProductImageUploadingComponent } from './product-image-uploading/product-image-uploading.component';
import { environment } from 'apps/aims-pos/src/environments/environment';

@Component({
  selector: 'aims-pos-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @ViewChild(ProductTableComponent) productTable: any;
  @ViewChild(ProductImageUploadingComponent) imageUpload: any;

  roleID: any = 0;

  cmbBarcode: any;
  cmbCategory: any;
  cmbSubCategory: any;

  pageFields: ProductInterface = {
    productID: '0', //0
    userID: '', //1
    categoryID: '0', //2
    productName: '', //3
    productNameUrdu: '', //4
    brandID: '0', //5
    locationID: '0', //6
    barcode1: '', //7
    barcode2: '', //8
    barcode3: '', //9
    quickSale: '', //10
    colorID: '', //11
    sizeID: '', //12
    costPrice: '', //13
    salePrice: '', //14
    retailPrice: '', //15
    wholeSalePrice: '', //16
    reOrderLevel: '', //17
    maxLimit: '', //18
    gst: '', //19
    et: '', //20
    packingQty: '', //21
    packingSalePrice: '', //22
    uomID: '0', //23
    pctCode: '', //24
    barcodeID: '0', //25
    pPriceID: '0', //26
    applicationEDocPath: '', //27
    applicationEDoc: '', //28
    applicationEdocExtenstion: '', //29
    potSize: '', //30
    potType: '', //31
    companyid: '', //32
    businessid: '', //33
    branchid: '', //34
    mfgDate: '', //35
    expDate: '', //36
    moduleId: '', //37
  };

  formFields: MyFormField[] = [
    {
      value: this.pageFields.productID,
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
      value: this.pageFields.categoryID,
      msg: 'select category',
      type: 'selectBox',
      required: true,
    },
    {
      value: this.pageFields.productName,
      msg: 'enter product name',
      type: 'textBox',
      required: true,
    },
    {
      value: this.pageFields.productNameUrdu,
      msg: 'enter product name urdu',
      type: 'textBox',
      required: false,
    },
    {
      value: this.pageFields.brandID,
      msg: 'enter brand',
      type: 'selectBox',
      required: false,
    },
    {
      value: this.pageFields.locationID,
      msg: 'select location',
      type: 'selectBox',
      required: false,
    },
    {
      value: this.pageFields.barcode1,
      msg: 'enter barcode',
      type: 'textbox',
      required: false,
    },
    {
      value: this.pageFields.barcode2,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.barcode3,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.quickSale,
      msg: 'select quick sale',
      type: 'selectBox',
      required: false,
    },
    {
      value: this.pageFields.colorID,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFields.sizeID,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFields.costPrice,
      msg: 'enter cost price',
      type: 'textBox',
      required: true,
    },
    {
      value: this.pageFields.salePrice,
      msg: 'enter sale price',
      type: 'textBox',
      required: true,
    },
    {
      value: this.pageFields.retailPrice,
      msg: 'enter retail price',
      type: 'textBox',
      required: false,
    },
    {
      value: this.pageFields.wholeSalePrice,
      msg: 'enter whole sale price',
      type: 'textBox',
      required: false,
    },
    {
      value: this.pageFields.reOrderLevel,
      msg: 'enter re-order level',
      type: 'textBox',
      required: false,
    },
    {
      value: this.pageFields.maxLimit,
      msg: 'enter max limit',
      type: 'textBox',
      required: false,
    },
    {
      value: this.pageFields.gst,
      msg: '',
      type: 'textBox',
      required: false,
    },
    {
      value: this.pageFields.et,
      msg: '',
      type: 'textBox',
      required: false,
    },
    {
      value: this.pageFields.packingQty,
      msg: 'enter packing',
      type: 'textBox',
      required: false,
    },
    {
      value: this.pageFields.packingSalePrice,
      msg: 'enter packing sale price',
      type: 'textBox',
      required: false,
    },
    {
      value: this.pageFields.uomID,
      msg: 'select measurement unit',
      type: 'selectBox',
      required: false,
    },
    {
      value: this.pageFields.pctCode,
      msg: '',
      type: 'textBox',
      required: false,
    },
    {
      value: this.pageFields.barcodeID,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFields.pPriceID,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFields.applicationEDocPath,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.applicationEDoc,
      msg: 'select membership document',
      type: 'File',
      required: false,
    },
    {
      value: this.pageFields.applicationEdocExtenstion,
      msg: '',
      type: 'textbox',
      required: false,
    },
    {
      value: this.pageFields.potSize,
      msg: 'enter pot size',
      type: 'textbox',
      required: false,
    },
    {
      value: this.pageFields.potType,
      msg: 'enter pot type',
      type: 'selectbox',
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
      value: this.pageFields.branchid,
      msg: '',
      type: 'selectbox',
      required: false,
    },
    {
      value: this.pageFields.mfgDate,
      msg: '',
      type: 'datePicker',
      required: false,
    },
    {
      value: this.pageFields.expDate,
      msg: '',
      type: 'datePicker',
      required: false,
    },
    {
      value: this.pageFields.moduleId,
      msg: '',
      type: 'hidden',
      required: false,
    },
  ];

  productPic: any;
  tabIndex = 0;
  error: any;
  moduleId: string | null;
  companyList: any = [];
  businessList: any = [];
  branchList: any = [];
  brandList: any = [];
  categoryList: any = [];
  subCategoryList: any = [];
  locationList: any = [];
  uomList: any = [];
  potList: any = [
    {
      potID: 1,
      potName: 'Cement',
    },
    {
      potID: 2,
      potName: 'Mud',
    },
    {
      potID: 3,
      potName: 'Plastic',
    },
  ];

  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) {}

  ngOnInit(): void {
    this.moduleId = localStorage.getItem('moduleId');
    this.formFields[37].value = localStorage.getItem('moduleId');
    // this.globalService.setHeaderTitle("Product");
    this.formFields[1].value = this.globalService.getUserId().toString();
    this.productPic =
      'https://icons.veryicon.com/png/o/application/applet-1/product-17.png';

    this.formFields[10].value = 'no';
    this.formFields[21].value = 1;
    this.formFields[24].value = '-';
    this.formFields[19].value = 0;
    this.formFields[20].value = 0;

    this.cmbBarcode = 1;

    this.roleID = this.globalService.getRoleId();
    this.getCompany();
    // this.getBrand();
    this.getCategory();
    // this.getLocation();
    // this.getUOM();
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
      companyID = this.formFields[32].value;
    } else {
      companyID = this.globalService.getCompanyID();
    }
    this.dataService
      .getHttp('cmis-api/Business/getBusiness?companyID=' + companyID, '')
      .subscribe(
        (response: any) => {
          this.businessList = response;
          if (this.globalService.getRoleId() != 1) {
            this.formFields[32].value = this.globalService.getCompanyID();
            this.formFields[33].value = this.globalService.getBusinessID();
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
      businessID = this.formFields[33].value;
    } else {
      businessID = this.globalService.getBusinessID();
      if (this.formFields[33].value == '') {
        this.formFields[33].value = this.globalService.getBusinessID();
      }
    }

    this.dataService
      .getHttp('cmis-api/Branch/getBranch?businessID=' + businessID, '')
      .subscribe(
        (response: any) => {
          this.branchList = response;
          if (this.globalService.getRoleId() != 1) {
            this.formFields[34].value = this.globalService.getBranchID();
          }
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  // getBrand() {
  //   this.dataService.getHttp('core-api/Brand/getBrand', '').subscribe(
  //     (response: any) => {
  //       this.brandList = response;
  //     },
  //     (error: any) => {
  //       console.log(error);
  //     }
  //   );
  // }

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
          this.categoryList = response;
          this.cmbCategory = response[0].categoryID;
          this.getSubCategory(response[0].categoryID);
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  // getLocation() {
  //   this.dataService.getHttp('core-api/Location/getLocation', '').subscribe(
  //     (response: any) => {
  //       this.locationList = response;
  //     },
  //     (error: any) => {
  //       console.log(error);
  //     }
  //   );
  // }

  // getUOM() {
  //   this.dataService.getHttp('core-api/UOM/getMeasurementUnit', '').subscribe(
  //     (response: any) => {
  //       this.uomList = response;
  //     },
  //     (error: any) => {
  //       console.log(error);
  //     }
  //   );
  // }

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
          this.subCategoryList = response;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  save() {
    this.formFields[5].value = 1;
    this.formFields[23].value = 1;

    if (this.cmbSubCategory == '' || this.cmbSubCategory == undefined) {
      this.formFields[2].value = this.cmbCategory;
    } else {
      this.formFields[2].value = this.cmbSubCategory;
    }

    if (this.cmbBarcode == 2) {
      if (
        this.formFields[7].value == '' &&
        this.formFields[8].value == '' &&
        this.formFields[9].value == ''
      ) {
        this.valid.apiInfoResponse('please enter barcode');
        return;
      }
    }

    if (this.formFields[6].value == '') {
      this.formFields[6].value = '0';
    }
    if (this.formFields[12].value == '') {
      this.formFields[12].value = '0';
    }
    if (this.formFields[11].value == '') {
      this.formFields[11].value = '0';
    }
    if (this.formFields[15].value == '') {
      this.formFields[15].value = '0';
    }
    if (this.formFields[16].value == '') {
      this.formFields[16].value = '0';
    }
    if (this.formFields[17].value == '') {
      this.formFields[17].value = '0';
    }
    if (this.formFields[18].value == '') {
      this.formFields[18].value = '0';
    }
    if (this.formFields[20].value == '') {
      this.formFields[20].value = '0';
    }
    if (this.formFields[22].value == '') {
      this.formFields[22].value = '0';
    }
    if (this.formFields[25].value == '') {
      this.formFields[25].value = '0';
    }
    if (this.formFields[26].value == '') {
      this.formFields[26].value = '0';
    }

    this.formFields[27].value = this.imageUpload.image;
    this.formFields[29].value = this.imageUpload.imageExt;

    if (
      this.formFields[27].value != undefined &&
      this.formFields[27].value != ''
    ) {
      this.formFields[28].value = environment.imageUrl + 'productPictures';
      // 'D:/logix/SocietyProject/Society/libs/ui/src/lib/assets/images/memberPictures';
    } else {
      this.formFields[29].value = '';
      this.formFields[27].value = '';
      this.formFields[28].value = '';
    }

    if (this.formFields[35].value == '') {
      this.formFields[35].value = new Date();
    }
    if (this.formFields[36].value == '') {
      this.formFields[36].value = new Date();
    }
    console.log(this.formFields);
    if (this.formFields[0].value == '0') {
      this.dataService
        .savetHttp(
          this.pageFields,
          this.formFields,
          'core-api/Product/saveProduct'
        )
        .subscribe(
          (response: any) => {
            console.log(response);
            if (response.message == 'Success') {
              this.valid.apiInfoResponse('Record saved successfully');

              this.productTable.getProduct();
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
          'core-api/Product/updateProduct?userID=' +
            this.globalService.getUserId() +
            '&moduleId=' +
            this.moduleId
        )
        .subscribe(
          (response: any) => {
            console.log(response);
            if (response.message == 'Success') {
              this.valid.apiInfoResponse('Record updated successfully');

              this.productTable.getProduct();
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

    this.cmbBarcode = 1;
    // this.cmbCategory = '';
    this.cmbSubCategory = '';
    this.subCategoryList = [];

    this.formFields[0].value = '0';
    this.formFields[7].value = '';
    this.formFields[8].value = '';
    this.formFields[9].value = '';
    this.formFields[10].value = 'no';
    this.formFields[19].value = 0;
    this.formFields[20].value = 0;
    this.formFields[21].value = 1;
    this.formFields[22].value = '';
  }

  edit(item: any) {
    console.log(item);

    this.tabIndex = 0;

    this.formFields[0].value = item.productID;
    this.formFields[2].value = item.categoryID;

    this.formFields[3].value = item.productName;
    this.formFields[4].value = item.productNameUrdu;

    // this.formFields[5].value = item.brandID;
    // this.formFields[6].value = item.locationID;

    if (item.barcode1 != 'null') {
      this.formFields[7].value = item.barcode1;
    }
    if (item.barcode2 != 'null') {
      this.formFields[8].value = item.barcode2;
    }
    if (item.barcode3 != 'null') {
      this.formFields[9].value = item.barcode3;
    }

    if (
      item.barcode1 != 'null' ||
      item.barcode2 != 'null' ||
      item.barcode3 != 'null'
    ) {
      this.cmbBarcode = 2;
    }

    // this.formFields[10].value = item.quickSale;

    // this.formFields[11].value = item.colorID;
    // this.formFields[12].value = item.sizeID;
    this.formFields[13].value = item.costPrice;
    this.formFields[14].value = item.salePrice;
    // this.formFields[15].value = item.retailPrice;
    // this.formFields[16].value = item.wholeSalePrice;
    // this.formFields[17].value = item.rol;
    // this.formFields[18].value = item.maxLimit;
    // this.formFields[19].value = item.gst;
    // this.formFields[20].value = item.et;
    // this.formFields[21].value = item.packing;
    // this.formFields[22].value = item.packingSalePrice;
    // this.formFields[23].value = item.uomID;
    // this.formFields[24].value = item.pctCode;
    this.formFields[25].value = item.barcodeID;
    this.formFields[26].value = item.pPriceID;
    this.cmbCategory = item.parentCategoryID;

    if (item.parentCategoryID != 0) {
      this.getSubCategory(item.parentCategoryID);
      this.cmbCategory = item.parentCategoryID;
      this.cmbSubCategory = item.categoryID;
    } else {
      this.cmbCategory = item.categoryID;
    }

    // this.formFields[30].value = item.potSize;
    // this.formFields[31].value = item.potType;
    // this.formFields[12].value = item.parentLocationID;
    this.formFields[35].value = new Date(item.mfgDate);
    this.formFields[36].value = new Date(item.expDate);
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
