import { SharedHelpersFieldValidationsModule } from '@aims-pos/shared/helpers/field-validations';
import { TableVirtualScrollDataSource } from 'ng-cdk-table-virtual-scroll';

import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { MyFormField, SaleInterface } from '@aims-pos/shared/interface';
import { SharedServicesDataModule } from '@aims-pos/shared/services/data';
import { SharedServicesGlobalDataModule } from '@aims-pos/shared/services/global-data';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  HostListener,
  Input,
} from '@angular/core';
import { PrintSaleComponent } from './print-sale/print-sale.component';
import { ProductSaleTableComponent } from './product-sale-table/product-sale-table.component';
import { MatSelect } from '@angular/material/select';
import { PrintKotSaleComponent } from './print-kot-sale/print-kot-sale.component';
declare var $: any;

@Component({
  selector: 'aims-pos-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss'],
})
// export class SaleComponent implements AfterViewInit {
//   ngAfterViewInit(): void {
//     $('#noUnderlineInput').parent().find('.mat-form-field-underline').hide();
//   }

//   // ...
// }
export class SaleComponent implements OnInit {
  @ViewChild('txtFocusCode') txtFocusCode: ElementRef;
  @ViewChild('txtCash') txtCash: ElementRef;
  @ViewChild('searchName') searchName: MatSelect;
  @ViewChild(ProductSaleTableComponent) productSaleTable: any;
  @ViewChild(PrintSaleComponent) printSale: any;
  @ViewChild(PrintKotSaleComponent) printKot: any;

  @ViewChild('txtCash') _txtCash: ElementRef;
  @ViewChild('txtFocusCode') _txtFocusCode: ElementRef;

  chkExtendOrder: any;
  txtPin: any = '';
  lblOrderID: any = '';
  lblOrder: any = '';
  rdbType: any = '';
  roleID: any = 0;
  tblSearch: any = [];
  searchProduct: any = '';
  cmbProduct: any = '';
  cmbBankAmount: any = '';
  lblBankAmount: any = 0;
  txtCode: any = '';
  lblTotal: any = 0;
  lblCash: any = 0;
  lblInvoiceNo: any = 0;
  percentage: number = 0;
  lblCustomerName: any = '';
  lblBusinessTypeID: any = '';

  checkStatus: boolean = false;

  pageFields: SaleInterface = {
    invoiceNo: '0', //0
    userID: '', //1
    invoiceDate: '', //2
    partyID: '0', //3
    refInvoiceNo: '0', //4
    refInvoiceDate: '', //5
    discount: '0', //6
    cashReceived: '0', //7
    change: '0', //8
    description: '', //9
    json: '', //10
    companyid: '', //11
    businessid: '', //12
    branchid: '', //13
    moduleId: '', //14
    bankID: '0', //15
    bankcashReceived: '0', //16
    bankref: '', //17
    status: '', //18
    customerName: '', //19
    orderType: '', //20
    businessTypeID: '', //21
    orderJson: '', //22
    refOrderNo: '', //23
  };

  formFields: MyFormField[] = [
    {
      value: this.pageFields.invoiceNo,
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
      value: this.pageFields.invoiceDate,
      msg: '',
      type: 'date',
      required: false,
    },
    {
      value: this.pageFields.partyID,
      msg: '',
      type: 'selectBox',
      required: false,
    },
    {
      value: this.pageFields.refInvoiceNo,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.refInvoiceDate,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.discount,
      msg: '',
      type: 'textBox',
      required: false,
    },
    {
      value: this.pageFields.cashReceived,
      msg: '',
      type: 'textBox',
      required: false,
    },
    {
      value: this.pageFields.change,
      msg: '',
      type: 'textBox',
      required: false,
    },
    {
      value: this.pageFields.description,
      msg: '',
      type: 'textBox',
      required: false,
    },
    {
      value: this.pageFields.json,
      msg: 'enter products',
      type: 'textBox',
      required: true,
    },
    {
      value: this.pageFields.companyid,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.businessid,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.branchid,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.moduleId,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFields.bankID,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFields.bankcashReceived,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFields.bankcashReceived,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFields.bankref,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFields.status,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFields.customerName,
      msg: 'enter customer name',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFields.orderType,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFields.businessTypeID,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFields.orderJson,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFields.refOrderNo,
      msg: '',
      type: 'hidden',
      required: false,
    },
  ];

  error: any;
  cursorBlinking = false;
  chkApplied: any;
  companyList: any = [];
  businessList: any = [];
  branchList: any = [];
  invoiceList: any = [];
  productList: any = [];
  bankList: any = [];
  partyList: any = [];
  orderList: any = [];
  packageProdList: any = [];

  orderJsonList: any = [];

  moduleId: string | null;

  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) {}
  // ngAfterViewInit(): void {
  //   $('#noUnderlineInput').parent().find('.mat-form-field-underline').hide();
  // }

  ngOnInit(): void {
    this.moduleId = localStorage.getItem('moduleId');
    this.formFields[14].value = localStorage.getItem('moduleId');
    // this.globalService.setHeaderTitle("Sale");
    this.formFields[1].value = this.globalService.getUserId().toString();

    this.lblBusinessTypeID = this.globalService.getBusinessTypeID();

    this.formFields[12].value = this.globalService.getBusinessID();
    this.formFields[13].value = this.globalService.getBranchID();

    this.roleID = this.globalService.getRoleId();
    this.getCompany();
    this.getProduct();
    this.getParty();
    this.getBank();
    this.getInvoice();
    this.getOrder();
  }
  // @HostListener('window:keydown', ['$event'])
  // onKeyDown(event: KeyboardEvent) {
  //   if (event.key === 'F4') {
  //     event.preventDefault();
  //     this.setFocusOnInput();
  //   }
  // }

  /////////////////

  // dataSource = new TableVirtualScrollDataSource();

  /////////////////

  setFocusOnInput() {
    if (this.txtFocusCode && this.txtFocusCode.nativeElement) {
      this.txtFocusCode.nativeElement.focus();
    }
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'F4') {
      event.preventDefault();
      this.setFocusOnInput();
    } else if (event.key === 'Shift') {
      event.preventDefault();
      this.setFocusOnCash();
    } else if (event.key === 'F8') {
      this.openProductDropdown();
    }
  }
  setFocusOnCash() {
    if (this.txtCash && this.txtCash.nativeElement) {
      this.txtCash.nativeElement.focus();
    }
  }
  openProductDropdown() {
    if (this.searchName) {
      this.searchName.open();
    }
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
      companyID = this.formFields[11].value;
    } else {
      companyID = this.globalService.getCompanyID();
    }
    this.dataService
      .getHttp('cmis-api/Business/getBusiness?companyID=' + companyID, '')
      .subscribe(
        (response: any) => {
          this.businessList = response;
          if (this.globalService.getRoleId() != 1) {
            this.formFields[11].value = this.globalService.getCompanyID();
            this.formFields[12].value = this.globalService.getBusinessID();
            this.getBranch();
          }
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  trackItem(index: number, item: any) {
    return item.productID;
  }

  getBranch() {
    var businessID = 0;
    if (this.globalService.getRoleId() == 1) {
      businessID = this.formFields[12].value;
    } else {
      businessID = this.globalService.getBusinessID();
      if (this.formFields[12].value == '') {
        this.formFields[12].value = this.globalService.getBusinessID();
      }
    }

    this.dataService
      .getHttp('cmis-api/Branch/getBranch?businessID=' + businessID, '')
      .subscribe(
        (response: any) => {
          this.branchList = response;
          if (this.globalService.getRoleId() != 1) {
            this.formFields[13].value = this.globalService.getBranchID();
          }
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
          this.moduleId,
        ''
      )
      .subscribe(
        (response: any) => {
          // this.productList = response;
          // console.log(response);
          this.productList = [];
          for (var i = 0; i < response.length; i++) {
            var img = '';
            if (response[i].applicationedoc == '') {
              img =
                'http://135.181.62.34:7060/assets/ui/productPictures2/noImage.png';
              // img =
              //   'https://image.sungreenfresh.com:7061/assets/ui/productPictures/noImage.png';
            } else {
              img =
                'http://135.181.62.34:7060/assets/ui/productPictures/' +
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
              ptype: response[i].ptype,
            });
          }
          // console.log(this.productList)
        },
        (error: any) => {
          console.log(error);
        }
      );
  }
  getProductOfPackage(packageID: any) {
    this.dataService
      .getHttp(
        'core-api/Product/getProductOfPackage?branchID=' +
          this.globalService.getBranchID() +
          '&companyID=' +
          this.globalService.getCompanyID() +
          '&userID=' +
          this.globalService.getUserId().toString() +
          '&moduleId=' +
          this.moduleId +
          '&branchID=' +
          this.globalService.getBranchID() +
          '&packageID=' +
          packageID,
        ''
      )
      .subscribe(
        (response: any) => {
          this.packageProdList = response;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  getProdOfPackage(packageID: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.dataService
        .getHttp(
          'core-api/Product/getProductOfPackage?branchID=' +
            this.globalService.getBranchID() +
            '&companyID=' +
            this.globalService.getCompanyID() +
            '&userID=' +
            this.globalService.getUserId().toString() +
            '&moduleId=' +
            this.moduleId +
            '&branchID=' +
            this.globalService.getBranchID() +
            '&packageID=' +
            packageID,
          ''
        )
        .subscribe(
          (response: any) => {
            resolve(response);
            this.packageProdList = response;
          },
          (error: any) => {
            reject(error);
          }
        );
    });
  }

  newList: any[] = [];

  onCheckboxChange(item: any) {
    this.pushPackageProduct(item.productID);
  }

  getParty() {
    this.dataService
      .getHttp(
        'core-api/Party/getAllCustomer?userID=' +
          this.globalService.getUserId() +
          '&moduleId=' +
          this.moduleId +
          '&branchID=' +
          this.globalService.getBranchID(),
        ''
      )
      .subscribe(
        (response: any) => {
          // this.bpsTable.tableData = response;
          this.partyList = response;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  pushProductByCode(item: any, e: any) {
    if (e.ctrlKey == true) {
      this._txtCash.nativeElement.focus();
      this.formFields[7].value = '';
      this.txtCode = '';
    }
    if (e.keyCode == 13) {
      return;
    }
    var data = this.productList.filter(
      (x: { barcode1: any; barcode2: any; barcode3: any }) =>
        x.barcode1 == item.toString() &&
        (x.barcode2 == '' || x.barcode2 == null) &&
        (x.barcode3 == '' || x.barcode3 == null)
    );
    if (data.length == 0 && item.toString() != '') {
      data = this.productList.filter(
        (x: { barcode1: any; barcode2: any; barcode3: any }) =>
          x.barcode2 == item.toString() &&
          (x.barcode3 == '' || x.barcode3 == null)
      );

      if (data.length == 0 && item.toString() != '') {
        var data = this.productList.filter(
          (x: { barcode1: any; barcode2: any; barcode3: any }) =>
            x.barcode3 == item.toString()
        );

        if (data.length == 0) {
          return;
        }
      }
    }
    if (this.productSaleTable.tableData.length == 0) {
      this.productSaleTable.tableData.push({
        barcode1: data[0].barcode1,
        barcode2: data[0].barcode2,
        barcode3: data[0].barcode3,
        productID: data[0].productID,
        productName: data[0].productName,
        qty: 1,
        costPrice: data[0].costPrice,
        salePrice: data[0].salePrice,
        locationID: data[0].locationID,
        total: data[0].salePrice,
        packing: data[0].packing,
        packingSalePrice: data[0].packingSalePrice,
        status: '',
      });
    } else {
      var found = false;
      var index = 0;
      for (var i = 0; i < this.productSaleTable.tableData.length; i++) {
        if (item != '') {
          if (
            this.productSaleTable.tableData[i].barcode1 == item ||
            this.productSaleTable.tableData[i].barcode2 == item ||
            this.productSaleTable.tableData[i].barcode3 == item
          ) {
            found = true;
            index = i;
            i = this.productSaleTable.tableData.length + 1;
          }
        }
      }
      if (found == true) {
        if (this.productSaleTable.tableData[index].status == 'deleted') {
          this.productSaleTable.tableData[index].status = '';
        } else {
          this.productSaleTable.tableData[index].qty += 1;
          this.productSaleTable.tableData[index].total =
            this.productSaleTable.tableData[index].salePrice *
            this.productSaleTable.tableData[index].qty;
        }
      } else {
        this.productSaleTable.tableData.push({
          barcode1: data[0].barcode1,
          barcode2: data[0].barcode2,
          barcode3: data[0].barcode3,
          productID: data[0].productID,
          productName: data[0].productName,
          qty: 1,
          costPrice: data[0].costPrice,
          salePrice: data[0].salePrice,
          locationID: data[0].locationID,
          total: data[0].salePrice,
          packing: data[0].packing,
          packingSalePrice: data[0].packingSalePrice,
          status: '',
        });
      }
    }
    if (data.length !== 0 && data[0].ptype === 'package') {
      this.getProdOfPackage(data[0].productID)
        .then((packageProdList: any[]) => {
          for (const packageProduct of packageProdList) {
            const item = packageProduct.barcode1; // Assuming item is defined elsewhere in the code

            // Find if the product already exists in the tableData
            const existingProductIndex =
              this.productSaleTable.tableData.findIndex((product: any) =>
                [product.barcode1, product.barcode2, product.barcode3].includes(
                  item
                )
              );

            if (existingProductIndex !== -1) {
              const existingProduct =
                this.productSaleTable.tableData[existingProductIndex];
              if (existingProduct.status === 'deleted') {
                existingProduct.status = '';
              } else {
                existingProduct.qty += 1;
                existingProduct.total =
                  existingProduct.salePrice * existingProduct.qty;
              }
            } else {
              this.productSaleTable.tableData.push({
                barcode1: packageProduct.barcode1,
                barcode2: packageProduct.barcode2,
                barcode3: packageProduct.barcode3,
                productID: packageProduct.productID,
                productName: packageProduct.productName,
                qty: 1,
                costPrice: packageProduct.costPrice,
                salePrice: packageProduct.salePrice,
                locationID: packageProduct.locationID,
                total: packageProduct.salePrice,
                packing: packageProduct.packing,
                packingSalePrice: packageProduct.packingSalePrice,
                status: '',
              });
            }
          }
        })
        .catch((error: any) => {
          console.error(error);
        });
    }

    this.lblTotal = 0;
    for (var i = 0; i < this.productSaleTable.tableData.length; i++) {
      this.lblTotal += this.productSaleTable.tableData[i].total;
    }

    this.formFields[8].value = -this.lblTotal;
    this.txtCode = '';
  }

  pushPackageProduct(item: any) {
    var data = this.productList.filter(
      (x: { productID: any }) => x.productID == item
    );
    if (data[0].ptype !== 'package') {
      if (this.productSaleTable.tableData.length == 0) {
        this.productSaleTable.tableData.push({
          barcode1: data[0].barcode1,
          barcode2: data[0].barcode2,
          barcode3: data[0].barcode3,
          productID: data[0].productID,
          productName: data[0].productName,
          qty: 1,
          costPrice: data[0].costPrice,
          salePrice: data[0].salePrice,
          locationID: data[0].locationID,
          total: data[0].salePrice,
          packing: data[0].packing,
          packingSalePrice: data[0].packingSalePrice,
          status: '',
        });
      } else {
        var found = false;
        var index = 0;
        for (var i = 0; i < this.productSaleTable.tableData.length; i++) {
          if (this.productSaleTable.tableData[i].productID == item) {
            found = true;
            index = i;
            i = this.productSaleTable.tableData.length + 1;
          }
        }

        if (found == true) {
          if (this.productSaleTable.tableData[index].status == 'deleted') {
            this.productSaleTable.tableData[index].status = '';
          } else {
            this.productSaleTable.tableData[index].qty += 1;
            this.productSaleTable.tableData[index].total =
              this.productSaleTable.tableData[index].salePrice *
              this.productSaleTable.tableData[index].qty;
          }
        } else {
          this.productSaleTable.tableData.push({
            barcode1: data[0].barcode1,
            barcode2: data[0].barcode2,
            barcode3: data[0].barcode3,
            productID: data[0].productID,
            productName: data[0].productName,
            qty: 1,
            costPrice: data[0].costPrice,
            salePrice: data[0].salePrice,
            locationID: data[0].locationID,
            total: data[0].salePrice,
            packing: data[0].packing,
            packingSalePrice: data[0].packingSalePrice,
            status: '',
          });
        }
      }
    }
    this.lblTotal = 0;
    for (var i = 0; i < this.productSaleTable.tableData.length; i++) {
      this.lblTotal += this.productSaleTable.tableData[i].total;
    }
    if (this.formFields[7].value > 0) {
      this.formFields[8].value -= this.lblTotal;
    }
  }

  pushProduct(item: any) {
    var data = this.productList.filter(
      (x: { productID: any }) => x.productID == item
    );
    if (data[0].ptype !== 'package') {
      if (this.productSaleTable.tableData.length == 0) {
        this.productSaleTable.tableData.push({
          barcode1: data[0].barcode1,
          barcode2: data[0].barcode2,
          barcode3: data[0].barcode3,
          productID: data[0].productID,
          productName: data[0].productName,
          qty: 1,
          costPrice: data[0].costPrice,
          salePrice: data[0].salePrice,
          locationID: data[0].locationID,
          total: data[0].salePrice,
          packing: data[0].packing,
          packingSalePrice: data[0].packingSalePrice,
          status: '',
        });
      } else {
        var found = false;
        var index = 0;
        for (var i = 0; i < this.productSaleTable.tableData.length; i++) {
          if (this.productSaleTable.tableData[i].productID == item) {
            found = true;
            index = i;
            i = this.productSaleTable.tableData.length + 1;
          }
        }

        if (found == true) {
          if (this.productSaleTable.tableData[index].status == 'deleted') {
            this.productSaleTable.tableData[index].status = '';
          } else {
            this.productSaleTable.tableData[index].qty += 1;
            this.productSaleTable.tableData[index].total =
              this.productSaleTable.tableData[index].salePrice *
              this.productSaleTable.tableData[index].qty;
          }
        } else {
          this.productSaleTable.tableData.push({
            barcode1: data[0].barcode1,
            barcode2: data[0].barcode2,
            barcode3: data[0].barcode3,
            productID: data[0].productID,
            productName: data[0].productName,
            qty: 1,
            costPrice: data[0].costPrice,
            salePrice: data[0].salePrice,
            locationID: data[0].locationID,
            total: data[0].salePrice,
            packing: data[0].packing,
            packingSalePrice: data[0].packingSalePrice,
            status: '',
          });
        }
      }
    }
    this.lblTotal = 0;
    for (var i = 0; i < this.productSaleTable.tableData.length; i++) {
      this.lblTotal += this.productSaleTable.tableData[i].total;
    }
    if (this.formFields[7].value > 0) {
      this.formFields[8].value -= this.lblTotal;
    }
  }

  totalBill() {
    this.lblTotal = 0;
    // console.log((this.lblTotal += this.productSaleTable.tableData[i].total));
    for (var i = 0; i < this.productSaleTable.tableData.length; i++) {
      if (this.productSaleTable.tableData[i].status != 'deleted') {
        // var currentTotal = this.productSaleTable.tableData[i].total;
        this.lblTotal += this.productSaleTable.tableData[i].total;
      }
      // if (!isNaN(currentTotal)) {
      //   this.lblTotal += currentTotal;
      // }
    }
    if (this.formFields[7].value > 0) {
      // this.formFields[8].value -= this.lblTotal - this.formFields[7].value;
      // this.formFields[8].value = Math.max(calculatedValue, 0);
      this.formFields[8].value = this.formFields[7].value - this.lblTotal;
    }
  }

  changeValue() {
    if (this.formFields[8].value == '') {
      this.formFields[8].value = 0;
    }
    if (this.formFields[6].value == '') {
      this.formFields[6].value = 0;
    }
    // if(this.formFields[7].value == ''){
    //   this.formFields[7].value = 0;
    // }
    if (
      (this.formFields[7].value == '' || this.formFields[7].value == null) &&
      this.formFields[16].value == 0
    ) {
      this.valid.apiInfoResponse('enter cash');
      this.formFields[8].value = 0 - this.lblTotal;
      return;
    }
    // if (this.percentage > 0) {
    //   this.formFields[6].value = Math.round(
    //     this.lblTotal * (this.percentage / 100)
    //   );
    // }
    this.formFields[8].value =
      parseInt(this.formFields[6].value) +
      parseInt(this.formFields[7].value) +
      parseInt(this.formFields[16].value) -
      this.lblTotal;
  }

  save(printSection: string) {
    this.formFields[23].value = '0';

    if (this.formFields[8].value < 0 && this.formFields[3].value == '0') {
      this.valid.apiInfoResponse('select customer');
      return;
    }
    if (this.formFields[3].value != 0) {
      var id = this.formFields[3].value;
      var result = this.partyList.filter(function (val: any) {
        return val.partyID == id;
      });
      this.lblCustomerName = result[0].partyName;
    } else {
      this.lblCustomerName = '';
    }

    var date = new Date();

    this.formFields[16].value = this.cmbBankAmount;
    if (this.cmbBankAmount == '' || this.cmbBankAmount == null) {
      this.formFields[16].value = '0';
    }
    this.lblCash = this.formFields[7].value;

    this.formFields[2].value = new Date();

    var prodTableData: any = [];

    for (var i = 0; i < this.productSaleTable.tableData.length; i++) {
      if (this.productSaleTable.tableData[i].status != 'deleted') {
        prodTableData.push({
          productID: this.productSaleTable.tableData[i].productID,
          productName: this.productSaleTable.tableData[i].productName,
          qty: this.productSaleTable.tableData[i].qty,
          costPrice: this.productSaleTable.tableData[i].costPrice,
          salePrice: this.productSaleTable.tableData[i].salePrice,
          locationID: this.productSaleTable.tableData[i].locationID,
          total:
            this.productSaleTable.tableData[i].salePrice *
            this.productSaleTable.tableData[i].qty,
          status: '',
        });
      }
    }
    this.formFields[10].value = JSON.stringify(prodTableData);

    if (prodTableData.length == 0) {
      this.valid.apiInfoResponse('enter products');
      return;
    }

    if (
      (this.formFields[7].value == '' || this.formFields[7].value == null) &&
      this.formFields[16].value == 0
    ) {
      this.valid.apiInfoResponse('enter cash');
      // this.formFields[8].value = 0 - this.lblTotal;
      return;
    }
    if (
      (this.formFields[3].value == '' || this.formFields[3].value == '0') &&
      this.formFields[7].value == 0 &&
      this.formFields[16].value == 0
    ) {
      this.valid.apiInfoResponse('enter cash');
      return;
    }
    if (this.formFields[3].value == '') {
      var cash =
        parseInt(this.formFields[6].value) +
        parseInt(this.formFields[7].value) +
        parseInt(this.formFields[16].value);
      if (this.lblTotal > cash) {
        this.valid.apiInfoResponse('enter correct cash');
        return;
      }
    }

    if (this.lblTotal < parseInt(this.formFields[6].value)) {
      this.formFields[6].value =
        parseInt(this.formFields[6].value) - parseInt(this.formFields[8].value);
    }
    if (this.formFields[17].value == '0') {
      this.formFields[17].value = '';
    }
    if (printSection === 'kot') {
      this.formFields[18].value = 0;
    } else if (printSection === 'kotCustomerBill') {
      this.formFields[18].value = 1;
    } else {
      this.formFields[18].value = null;
    }
    this.formFields[21].value = this.globalService.getBusinessTypeID();

    this.formFields[22].value = JSON.stringify(this.orderJsonList);

    this.dataService
      .savetHttp(this.pageFields, this.formFields, 'core-api/Sale/saveSales')
      .subscribe(
        (response: any) => {
          // console.log(response);
          if (response.message == 'Success') {
            this.valid.apiInfoResponse('Record saved successfully');

            this.printSale.tableData = prodTableData;

            this.printSale.lblInvoice = response.invoiceNo;
            this.printSale.lblDate = date;
            this.printSale.lblGTotal = this.lblTotal;
            this.printSale.lblDiscount = this.formFields[6].value;
            this.printSale.lblCash = this.lblCash;
            this.printSale.lblBank = this.lblBankAmount;
            this.printSale.lblSubTotal = this.lblTotal;
            this.printSale.lblChange = this.formFields[8].value;

            setTimeout(() => this.globalService.printData(printSection), 200);
            this.resetBank();
            this.reset();
            this.getInvoice();
            this.getOrder();
            setTimeout(() => this._txtFocusCode.nativeElement.focus(), 1000);
          } else {
            this.valid.apiErrorResponse(response.toString());
          }
        },
        (error: any) => {
          this.error = error;
          this.valid.apiErrorResponse(this.error);
        }
      );
  }

  saveOrder(printSection: string) {
    if (this.chkExtendOrder == true) {
      if (this.formFields[23].value == '' || this.formFields[23].value == '0') {
        this.valid.apiInfoResponse('enter ref order no');
        return;
      }
    } else {
      this.formFields[23].value = '0';
    }

    if (
      this.formFields[7].value == 0 &&
      (this.formFields[3].value == 0 || this.formFields[3].value == '')
    ) {
      this.valid.apiInfoResponse('select customer');
      return;
    }

    this.formFields[21].value = this.globalService.getBusinessTypeID();

    if (this.rdbType == '') {
      this.valid.apiInfoResponse('select type');
      return;
    } else {
      this.formFields[20].value = this.rdbType;
    }

    if (this.rdbType == 'Dine-In') {
      if (this.formFields[9].value == '') {
        this.valid.apiInfoResponse('enter table no');
        return;
      }
    }

    if (this.formFields[3].value != 0) {
      var id = this.formFields[3].value;
      var result = this.partyList.filter(function (val: any) {
        return val.partyID == id;
      });
      this.lblCustomerName = result[0].partyName;
      this.formFields[19].value = result[0].partyName;
    } else {
      this.lblCustomerName = '';
    }

    var date = new Date();

    this.formFields[16].value = this.cmbBankAmount;
    if (this.cmbBankAmount == '' || this.cmbBankAmount == null) {
      this.formFields[16].value = '0';
    }
    this.lblCash = this.formFields[7].value;

    this.formFields[2].value = new Date();

    var prodTableData: any = [];

    for (var i = 0; i < this.productSaleTable.tableData.length; i++) {
      if (this.productSaleTable.tableData[i].status != 'deleted') {
        prodTableData.push({
          productID: this.productSaleTable.tableData[i].productID,
          productName: this.productSaleTable.tableData[i].productName,
          qty: this.productSaleTable.tableData[i].qty,
          costPrice: this.productSaleTable.tableData[i].costPrice,
          salePrice: this.productSaleTable.tableData[i].salePrice,
          locationID: this.productSaleTable.tableData[i].locationID,
          total:
            this.productSaleTable.tableData[i].salePrice *
            this.productSaleTable.tableData[i].qty,
          status: '',
        });
      }
    }
    this.formFields[10].value = JSON.stringify(prodTableData);

    if (prodTableData.length == 0) {
      this.valid.apiInfoResponse('enter products');
      return;
    }

    // if (
    //   (this.formFields[7].value == '' || this.formFields[7].value == null) &&
    //   this.formFields[16].value == 0
    // ) {
    //   this.valid.apiInfoResponse('enter cash');
    //   // this.formFields[8].value = 0 - this.lblTotal;
    //   return;
    // }
    // if (
    //   (this.formFields[3].value == '' || this.formFields[3].value == '0') &&
    //   this.formFields[7].value == 0 &&
    //   this.formFields[16].value == 0
    // ) {
    //   this.valid.apiInfoResponse('enter cash');
    //   return;
    // }
    // if (this.formFields[3].value == '') {
    //   var cash =
    //     parseInt(this.formFields[6].value) +
    //     parseInt(this.formFields[7].value) +
    //     parseInt(this.formFields[16].value);
    //   if (this.lblTotal > cash) {
    //     this.valid.apiInfoResponse('enter correct cash');
    //     return;
    //   }
    // }

    if (this.lblTotal < parseInt(this.formFields[6].value)) {
      this.formFields[6].value =
        parseInt(this.formFields[6].value) - parseInt(this.formFields[8].value);
    }
    if (this.formFields[17].value == '0') {
      this.formFields[17].value = '';
    }
    // if (printSection === 'kot') {
    //   this.formFields[18].value = 0;
    // } else if (printSection === 'kotCustomerBill') {
    //   this.formFields[18].value = 1;
    // } else {
    //   this.formFields[18].value = null;
    // }

    this.dataService
      .savetHttp(this.pageFields, this.formFields, 'core-api/Sale/saveOrder')
      .subscribe(
        (response: any) => {
          // console.log(response);
          if (response.message == 'Success') {
            this.valid.apiInfoResponse('Record saved successfully');

            this.printKot.tableData = prodTableData;

            this.printKot.lblInvoice = response.orderNo;
            this.printKot.lblDate = date;
            this.printKot.lblType = this.rdbType;
            // if (printSection === 'kot' || 'kotCustomerBill') {
            //   this.printKotReport(prodTableData, response, date, printSection);
            //   return;
            // }
            setTimeout(() => this.globalService.printData(printSection), 200);
            this.resetBank();
            this.reset();
            this.getOrder();
            setTimeout(() => this._txtFocusCode.nativeElement.focus(), 1000);
          } else {
            this.valid.apiErrorResponse(response.toString());
          }
        },
        (error: any) => {
          this.error = error;
          this.valid.apiErrorResponse(this.error);
        }
      );
  }

  printKotReport(
    prodTableData: any,
    response: any,
    date: any,
    printSection: string
  ) {
    this.printKot.tableData = prodTableData;
    printSection === 'kotCustomerBill'
      ? (this.printKot.isCustomer = true)
      : (this.printKot.isCustomer = false);
    this.printKot.toPrintData.push({
      lblInvoice: response.invoiceNo,
      lblDate: date,
    });
    setTimeout(() => this.printKot.print());
    // this.resetBank();
    // this.reset();
    // this.getInvoice();
  }

  checkSaleReturn() {
    if (this.productSaleTable.tableData.length == 0) {
      this.valid.apiInfoResponse('enter products');
      return;
    }

    $('#saleReturnModal').modal('show');
  }

  saleReturn() {
    this.formFields[23].value = '0';

    this.dataService
      .getHttp(
        'core-api/Sale/getSaleReturn?invoiceNo=' +
          this.lblInvoiceNo +
          '&userID=' +
          this.globalService.getUserId() +
          '&moduleId=' +
          this.moduleId +
          '&branchId=' +
          this.globalService.getBranchID(),
        ''
      )
      .subscribe(
        (response: any) => {
          if (response.length == 0) {
            this.valid.apiInfoResponse('no invoice found');
            return;
          } else {
            let result = this.productSaleTable.tableData.filter(
              (r1: { productID: any; qty: any }) =>
                response.some(
                  (r2: { productID: any; qty: any }) =>
                    r1.productID === r2.productID && r1.qty <= r2.qty
                )
            );

            if (this.productSaleTable.tableData.length == result.length) {
              this.lblCash = this.formFields[7].value;

              this.formFields[4].value = this.lblInvoiceNo;
              this.formFields[5].value = new Date();

              this.formFields[10].value = JSON.stringify(
                this.productSaleTable.tableData
              );

              this.formFields[21].value =
                this.globalService.getBusinessTypeID();

              this.dataService
                .savetHttp(
                  this.pageFields,
                  this.formFields,
                  'core-api/Sale/saveSaleReturn?userID=' +
                    this.globalService.getUserId() +
                    '&moduleId=' +
                    this.moduleId
                )
                .subscribe(
                  (response: any) => {
                    // console.log(response);
                    if (response.message == 'Success') {
                      this.valid.apiInfoResponse('Record saved successfully');

                      this.reset();
                    } else {
                      this.valid.apiErrorResponse(response.toString());
                    }
                  },
                  (error: any) => {
                    this.error = error;
                    this.valid.apiErrorResponse(this.error);
                  }
                );
            } else {
              this.valid.apiErrorResponse('product not found in sale invoice');
              return;
            }
          }
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  reset() {
    this.formFields = this.valid.resetFormFields(this.formFields);

    this.formFields[0].value = '0';
    this.formFields[2].value = '';
    this.formFields[3].value = '0';
    this.formFields[4].value = '0';
    this.formFields[5].value = '';
    this.formFields[6].value = '0';
    this.formFields[7].value = '0';
    this.formFields[8].value = '0';
    this.formFields[9].value = '';
    this.formFields[23].value = '';
    this.chkExtendOrder = false;

    this.lblInvoiceNo = 0;
    this.searchProduct = '';
    this.cmbProduct = '';
    this.lblTotal = 0;
    this.lblCash = 0;
    this.productSaleTable.tableData = [];
    this.txtCode = '';
    this.chkApplied = false;
    this.percentage = 0;
    this.lblOrder = '';
    this.orderJsonList = [];
    $('#saleReturnModal').modal('hide');
  }

  getKeyPressed(e: any, printSection: string) {
    if (e.keyCode == 13) {
      this.save(printSection);
    }
  }

  calculateTotalAmount(item: any) {
    if (item == 1) {
      this.formFields[6].value = Math.round(
        this.lblTotal * (this.percentage / 100)
      );
      this.formFields[8].value =
        parseInt(this.formFields[6].value) +
        parseInt(this.formFields[7].value) -
        this.lblTotal;
    }
    if (item == 2) {
      this.percentage = Number(
        ((this.formFields[6].value * 100) / this.lblTotal).toFixed(2)
      );
      // this.percentage.toFixed(2);
      this.formFields[8].value =
        parseInt(this.formFields[6].value) +
        parseInt(this.formFields[7].value) -
        this.lblTotal;
    }
  }

  getBank() {
    this.dataService
      .getHttp(
        'core-api/Bank/getBank?companyID=' +
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
          this.bankList = response;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  Generated(item: any) {
    // this.employeeList = this.tempEmpList;
    if (item == true) {
      // openModal() {
      setTimeout(() => $('#bankModal').modal('show'), 300);
      // }
      // var data = this.employeeList.filter(function (e: any) {
      //   return e.payrollGroupID > '0';
      // });
      // this.employeeList = data;
      // this.chkUnApplied = false;
    }
    if (item == false) {
      this.lblBankAmount = 0;
      this.formFields[16].value = 0;
      this.changeValue();
      this.resetBank();
    }
  }
  addBank() {
    setTimeout(() => $('#bankModal').modal('hide'), 300);
    this.lblBankAmount = this.cmbBankAmount;
    this.formFields[16].value = this.cmbBankAmount;
  }
  resetBank() {
    this.lblBankAmount = 0;
    this.formFields[15].value = '0';
    this.cmbBankAmount = '';
    this.formFields[16].value = '0';
    this.formFields[17].value = '';
  }
  hideModal() {
    $('#customerModal').modal('hide');
  }

  getInvoice() {
    this.dataService
      .getHttp(
        'report-api/FMISReport/getInvoiceDetail?companyID=' +
          this.globalService.getCompanyID() +
          '&branchID=' +
          this.globalService.getBranchID() +
          '&userID=' +
          this.globalService.getUserId() +
          '&moduleId=' +
          this.moduleId,
        ''
      )
      .subscribe(
        (response: any) => {
          this.invoiceList = response;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  getOrder() {
    this.dataService
      .getHttp(
        'core-api/Sale/getOrder?branchID=' +
          this.globalService.getBranchID() +
          '&userID=' +
          this.globalService.getUserId() +
          '&moduleId=' +
          this.moduleId,
        ''
      )
      .subscribe(
        (response: any) => {
          this.orderList = response;
          this.orderList.sort((a: any, b: any) => b.orderID - a.orderID);
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  getKeyUpOrderDetail(e: any) {
    if (e.keyCode == 13) {
      var data = this.orderList.filter(
        (x: any) => x.orderID == this.formFields[23].value
      );

      this.formFields[3].value = data[0].customerID;
      this.formFields[9].value = data[0].remarks;
      this.rdbType = data[0].orderType;
    }
  }

  getInvoiceDetail(item: any, printSection: string) {
    this.dataService
      .getHttp(
        'report-api/FMISReport/getInvoicePrintDetail?companyid=' +
          this.globalService.getCompanyID() +
          '&branchid=' +
          this.globalService.getBranchID() +
          '&userID=' +
          this.globalService.getUserId() +
          '&moduleId=' +
          this.moduleId +
          '&invoiceNo=' +
          item.invoiceNo,
        ''
      )
      .subscribe(
        (response: any) => {
          if (response.length > 0) {
            this.printSale.lblInvoice = response[0].invoiceNo;
            this.printSale.lblDate = response[0].invoiceDate;
            // this.printSale.lblDate
            this.printSale.lblName = response[0].empName;
            this.printSale.customerName = response[0].partyname;
            this.printSale.lblGTotal = response[0].grandTotal;
            this.printSale.lblDiscount = response[0].discount;
            this.printSale.lblCash = response[0].cashReceived;
            this.printSale.lblBank = response[0].bankcashReceived;
            this.printSale.lblChange = response[0].change;
            this.printSale.lblSubTotal = response[0].subtotal;
            this.printSale.lblGrandBal = response[0].grandbal;
            this.printSale.lblOldBal = response[0].oldbal;
            this.printSale.lblNewBal = response[0].newbal;
            this.printSale.lblGrandTotal =
              response[0].cashReceived - response[0].change;
          }
          const extractedData = response.map((item: any) => ({
            productName: item.productName,
            qty: item.qty,
            salePrice: item.salePrice,
            total: item.totalsalePrice,
          }));
          this.printSale.tableData = extractedData;
          setTimeout(() => this.globalService.printData(printSection), 250);
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  getOrderDetail(item: any, value: any) {
    if (value == 'edit') {
      this.lblOrder = item.orderID;
      this.formFields[19].value = item.customerName;
      this.formFields[9].value = item.remarks;
      this.rdbType = item.orderType;

      if (this.orderJsonList.length == 0) {
        this.orderJsonList.push({
          orderID: item.orderID,
          refOrderID: item.refOrderID,
          customerID: item.customerID,
        });
      } else {
        for (var i = 0; i < this.orderJsonList.length; i++) {
          if (this.orderJsonList[i].refOrderID != item.refOrderID) {
            this.valid.apiInfoResponse('reference order no. not matched');
            return;
          }
          if (this.orderJsonList[i].orderID == item.orderID) {
            this.valid.apiInfoResponse('order already added in list');
            return;
          }
        }
        this.orderJsonList.push({
          orderID: item.orderID,
          refOrderID: item.refOrderID,
          customerID: item.customerID,
        });
      }
    }

    this.dataService
      .getHttp(
        'core-api/Sale/getOrderDetail?branchid=' +
          this.globalService.getBranchID() +
          '&userID=' +
          this.globalService.getUserId() +
          '&moduleId=' +
          this.moduleId +
          '&orderNo=' +
          item.orderID,
        ''
      )
      .subscribe(
        (response: any) => {
          if (value == 'edit') {
            for (var i = 0; i < response.length; i++) {
              var found = false;
              var index = 0;
              for (var j = 0; j < this.productSaleTable.tableData.length; j++) {
                if (
                  this.productSaleTable.tableData[j].productID ==
                  response[i].productID
                ) {
                  found = true;
                  index = j;
                  j = this.productSaleTable.tableData.length + 1;
                }
              }

              if (found == true) {
                if (
                  this.productSaleTable.tableData[index].status == 'deleted'
                ) {
                  this.productSaleTable.tableData[index].status = '';
                } else {
                  this.productSaleTable.tableData[index].qty += response[i].qty;
                  this.productSaleTable.tableData[index].total =
                    this.productSaleTable.tableData[index].salePrice *
                    this.productSaleTable.tableData[index].qty;
                }
              } else {
                this.productSaleTable.tableData.push({
                  productID: response[i].productID,
                  productName: response[i].productName,
                  qty: response[i].qty,
                  costPrice: response[i].costPrice,
                  salePrice: response[i].price,
                  total: response[i].qty * response[i].price,
                  status: '',
                });
              }
            }

            this.lblTotal = 0;
            for (var i = 0; i < this.productSaleTable.tableData.length; i++) {
              this.lblTotal += this.productSaleTable.tableData[i].total;
            }
            if (this.formFields[7].value > 0) {
              this.formFields[8].value -= this.lblTotal;
            }
          } else {
            this.printKot.lblInvoice = item.orderID;
            this.printKot.lblType = item.orderType;

            var tempList: any = [];
            for (var i = 0; i < response.length; i++) {
              tempList.push({
                orderDetailID: response[i].orderDetailID,
                orderID: response[i].orderID,
                productID: response[i].productID,
                productName: response[i].productName,
                price: response[i].price,
                costPrice: response[i].costPrice,
                qty: response[i].qty,
              });
            }
            this.printKot.tableData = tempList;

            setTimeout(() => this.globalService.printData('#print-kot'), 200);
          }
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  checkPin(item: any) {
    if (
      this.globalService.getPinCode() == null ||
      this.globalService.getPinCode() == '0'
    ) {
      this.valid.apiErrorResponse('Pin not allowed');
      return;
    } else {
      $('#pinModal').modal('show');
      this.lblOrderID = item.orderID;
    }
  }

  pin() {
    if (this.txtPin == '') {
      this.valid.apiErrorResponse('enter pin');
      return;
    } else {
      this.dataService
        .getHttp(
          'user-api/User/getPin?pin=' +
            this.txtPin +
            '&userID=' +
            this.globalService.getUserId(),
          ''
        )
        .subscribe(
          (response: any) => {
            if (response.length == 0) {
              this.valid.apiErrorResponse('Invlaid pin');
              return;
            } else {
              this.deleteOrder(this.lblOrderID);
            }
          },
          (error: any) => {
            console.log(error);
          }
        );
    }
  }

  deleteOrder(item: any) {
    var pageFields = {
      orderID: '0',
      userID: '',
      moduleId: '',
    };

    var formFields: MyFormField[] = [
      {
        value: pageFields.orderID,
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
      {
        value: pageFields.moduleId,
        msg: '',
        type: 'hidden',
        required: false,
      },
    ];

    formFields[0].value = item;
    formFields[1].value = this.globalService.getUserId().toString();
    formFields[2].value = localStorage.getItem('moduleId');

    this.dataService
      .deleteHttp(pageFields, formFields, 'core-api/Sale/deleteOrder')
      .subscribe(
        (response: any) => {
          if (response.message == 'Success') {
            this.valid.apiInfoResponse('Record deleted successfully');
            this.getOrder();
            this.lblOrderID = '';
            this.txtPin = '';

            $('#pinModal').modal('hide');
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
  // async printContent() {
  //   try {
  //     const port = await navigator.serial.requestPort();
  //     await port.open({ baudRate: 9600 }); // Adjust baud rate as needed

  //     // Send your printer-specific commands here
  //     const printData = 'Your print data here';
  //     const writer = port.writable.getWriter();
  //     await writer.write(printData);
  //     writer.releaseLock();

  //     await port.close();
  //   } catch (error) {
  //     console.error('Error printing:', error);
  //   }
  // }
}
