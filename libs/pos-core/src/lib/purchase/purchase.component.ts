import { SharedHelpersFieldValidationsModule } from '@aims-pos/shared/helpers/field-validations';
import { MyFormField, SaleInterface } from '@aims-pos/shared/interface';
import { SharedServicesDataModule } from '@aims-pos/shared/services/data';
import { SharedServicesGlobalDataModule } from '@aims-pos/shared/services/global-data';
import {
  Component,
  OnInit,
  ViewChild,
  HostListener,
  ElementRef,
} from '@angular/core';
import { ProductPurchaseTableComponent } from './product-purchase-table/product-purchase-table.component';
import { DatePipe } from '@angular/common';

declare var $: any;

@Component({
  selector: 'aims-pos-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss'],
})
export class PurchaseComponent implements OnInit {
  @ViewChild(ProductPurchaseTableComponent) productPurchaseTable: any;
  @ViewChild('txtCash') _txtCash: ElementRef;
  @ViewChild('txtFocusCode') txtFocusCode: ElementRef;

  lblPInvoiceNo: any = 0;
  lblPartyName: any = 0;
  lblInvoiceDate: any = 0;

  tblSearch: any = '';
  searchProduct: any = '';
  cmbProduct: any = '';
  lblTotal: any = 0;
  lblCash: any = 0;
  lblInvoiceNo: any = 0;
  txtCode: any = '';
  roleID: any = 0;

  txtAdvanceTax: any = 0;
  txtAdvanceTaxAmount: any = 0;
  txtSaleTax: any = 0;
  txtSaleTaxAmount: any = 0;
  supplierSearch: any;
  startDate: any = new Date();
  endDate: any = new Date();
  totalInvoiceAmount: number = 0;

  pageFields: SaleInterface = {
    invoiceNo: '0', //0
    userID: '', //1
    invoiceDate: '', //2
    refInvoiceNo: '0', //3
    refInvoiceDate: '', //4
    partyID: '0', //5
    discount: '0', //6
    cashReceived: '0', //7
    change: '0', //8
    description: '', //9
    json: '', //10
    companyid: '', //11
    businessid: '', //12
    branchid: '', //13
    moduleId: '',
    bankID: '0', //15
    bankcashReceived: '0', //16
    bankref: '',
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
      value: this.pageFields.refInvoiceNo,
      msg: 'enter reference invoice no',
      type: 'textbox',
      required: false,
    },
    {
      value: this.pageFields.refInvoiceDate,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.partyID,
      msg: 'select supplier',
      type: 'selectBox',
      required: true,
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
      value: this.pageFields.bankref,
      msg: '',
      type: 'hidden',
      required: false,
    },
  ];

  companyList: any = [];
  businessList: any = [];
  branchList: any = [];

  error: any;

  invoiceList: any = [];
  invoiceDetailList: any = [];
  productList: any = [];
  partyList: any = [];

  moduleId: string | null;

  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.moduleId = localStorage.getItem('moduleId');
    this.formFields[1].value = this.globalService.getUserId().toString();
    this.formFields[14].value = localStorage.getItem('moduleId');
    var curDate = new Date();
    this.formFields[2].value = curDate;

    // this.formFields[10].value = 1;

    this.roleID = this.globalService.getRoleId();
    this.globalService.setHeaderTitle('Purchase');

    this.getCompany();
    this.getProduct();
    this.getParty();
    // this.getInvoice();
    this.getInvoice(this.startDate, this.endDate);
  }

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
    }
    // else if (event.key === 'Shift') {
    //   event.preventDefault();
    //   this.setFocusOnCash();
    // } else if (event.key === 'F8') {
    //   this.openProductDropdown();
    // }
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

  getInvoice(startDate: any, endDate: any) {
    var fromDate = this.datePipe.transform(startDate, 'yyyy-MM-dd');
    var toDate = this.datePipe.transform(endDate, 'yyyy-MM-dd');

    this.dataService
      .getHttp(
        'report-api/FMISReport/getPurchases?companyID=' +
          this.globalService.getCompanyID() +
          '&branchID=' +
          this.globalService.getBranchID() +
          '&userID=' +
          this.globalService.getUserId() +
          '&moduleId=' +
          this.moduleId +
          '&startDate=' +
          fromDate +
          '&endDate=' +
          toDate,
        ''
      )
      .subscribe(
        (response: any) => {
          this.invoiceList = response;

          this.totalInvoiceAmount = 0;
          // Sum the 'amount' column
          this.totalInvoiceAmount = this.invoiceList.reduce(
            (sum: number, invoice: any) => sum + Number(invoice.amount || 0),
            0
          );
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  getInvoiceDetail(item: any) {
    this.dataService
      .getHttp(
        'report-api/FMISReport/getPurchaseDetail?companyid=' +
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
          console.log(response);

          $('#purchaseDetailModal').modal('show');
          this.lblPInvoiceNo = response[0].invoiceNo;
          this.lblPartyName = response[0].empName;
          this.lblInvoiceDate = response[0].invoiceDate;

          this.invoiceDetailList = response;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  getProduct() {
    this.dataService
      .getHttp(
        'core-api/Product/getProduct?companyID=' +
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
          this.productList = response;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  getParty() {
    this.dataService
      .getHttp(
        'core-api/Party/getParty?companyID=' +
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
          this.partyList = response;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  pushProductByCode(item: any, e: any) {
    if (e.ctrlKey == true) {
      //   // alert(e.keyCode);
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
    if (this.productPurchaseTable.tableData.length == 0) {
      this.productPurchaseTable.tableData.push({
        barcode1: data[0].barcode1,
        barcode2: data[0].barcode2,
        barcode3: data[0].barcode3,
        productID: data[0].productID,
        productName: data[0].productName,
        qty: 1,
        costPrice: data[0].costPrice,
        tempCostPrice: data[0].costPrice,
        salePrice: data[0].salePrice,
        discount: 0,
        locationID: data[0].locationID,
        total: data[0].salePrice,
        packing: data[0].packing,
        packingSalePrice: data[0].packingSalePrice,
        status: '',
        stPer: 0,
        stAmount: 0,
        adtPer: 0,
        adtAmount: 0,
      });
    } else {
      var found = false;
      var index = 0;
      for (var i = 0; i < this.productPurchaseTable.tableData.length; i++) {
        if (
          this.productPurchaseTable.tableData[i].barcode1 == item ||
          this.productPurchaseTable.tableData[i].barcode2 == item ||
          this.productPurchaseTable.tableData[i].barcode3 == item
        ) {
          found = true;
          index = i;
          i = this.productPurchaseTable.tableData.length + 1;
        }
      }
      if (found == true) {
        if (this.productPurchaseTable.tableData[index].status == 'deleted') {
          this.productPurchaseTable.tableData[index].status = '';
        } else {
          this.productPurchaseTable.tableData[index].qty =
            parseInt(this.productPurchaseTable.tableData[index].qty) + 1;

          this.productPurchaseTable.tableData[index].adtAmount =
            (this.productPurchaseTable.tableData[index].costPrice *
              this.productPurchaseTable.tableData[index].qty *
              this.productPurchaseTable.tableData[index].adtPer) /
            100;

          this.productPurchaseTable.tableData[index].stAmount =
            (this.productPurchaseTable.tableData[index].costPrice *
              this.productPurchaseTable.tableData[index].qty *
              this.productPurchaseTable.tableData[index].stPer) /
            100;

          this.productPurchaseTable.tableData[index].total =
            this.productPurchaseTable.tableData[index].costPrice *
              this.productPurchaseTable.tableData[index].qty +
            this.productPurchaseTable.tableData[index].adtAmount +
            this.productPurchaseTable.tableData[index].stAmount;
        }
      } else {
        this.productPurchaseTable.tableData.push({
          barcode1: data[0].barcode1,
          barcode2: data[0].barcode2,
          barcode3: data[0].barcode3,
          productID: data[0].productID,
          productName: data[0].productName,
          qty: 1,
          costPrice: data[0].costPrice,
          tempCostPrice: data[0].costPrice,
          salePrice: data[0].salePrice,
          discount: 0,
          locationID: data[0].locationID,
          total: data[0].salePrice,
          packing: data[0].packing,
          packingSalePrice: data[0].packingSalePrice,
          status: '',
          stPer: 0,
          stAmount: 0,
          adtPer: 0,
          adtAmount: 0,
        });
      }
    }

    this.lblTotal = 0;
    for (var i = 0; i < this.productPurchaseTable.tableData.length; i++) {
      this.lblTotal += this.productPurchaseTable.tableData[i].total;
    }

    this.formFields[8].value = -this.lblTotal;
    this.txtCode = '';

    this.productPurchaseTable.calculateTotal();
  }

  pushProduct(item: any) {
    var data = this.productList.filter(
      (x: { productID: any }) => x.productID == item
    );

    if (this.productPurchaseTable.tableData.length == 0) {
      this.productPurchaseTable.tableData.push({
        productID: data[0].productID,
        barcode1: data[0].barcode1,
        productName: data[0].productName,
        qty: 1,
        costPrice: data[0].costPrice,
        tempCostPrice: data[0].costPrice,
        salePrice: data[0].salePrice,
        discount: 0,
        locationID: data[0].locationID,
        total: data[0].costPrice,
        stPer: 0,
        stAmount: 0,
        adtPer: 0,
        adtAmount: 0,
      });
    } else {
      var found = false;
      var index = 0;
      for (var i = 0; i < this.productPurchaseTable.tableData.length; i++) {
        if (this.productPurchaseTable.tableData[i].productID == item) {
          found = true;
          index = i;
          i = this.productPurchaseTable.tableData.length + 1;
        }
      }

      if (found == true) {
        this.productPurchaseTable.tableData[index].qty =
          parseInt(this.productPurchaseTable.tableData[index].qty) + 1;

        this.productPurchaseTable.tableData[index].adtAmount =
          (this.productPurchaseTable.tableData[index].costPrice *
            this.productPurchaseTable.tableData[index].qty *
            this.productPurchaseTable.tableData[index].adtPer) /
          100;

        this.productPurchaseTable.tableData[index].stAmount =
          (this.productPurchaseTable.tableData[index].costPrice *
            this.productPurchaseTable.tableData[index].qty *
            this.productPurchaseTable.tableData[index].stPer) /
          100;

        this.productPurchaseTable.tableData[index].total =
          this.productPurchaseTable.tableData[index].costPrice *
            this.productPurchaseTable.tableData[index].qty +
          this.productPurchaseTable.tableData[index].adtAmount +
          this.productPurchaseTable.tableData[index].stAmount;
      } else {
        this.productPurchaseTable.tableData.push({
          productID: data[0].productID,
          barcode1: data[0].barcode1,
          productName: data[0].productName,
          qty: 1,
          costPrice: data[0].costPrice,
          tempCostPrice: data[0].costPrice,
          salePrice: data[0].salePrice,
          discount: 0,
          locationID: data[0].locationID,
          total: data[0].costPrice,
          stPer: 0,
          stAmount: 0,
          adtPer: 0,
          adtAmount: 0,
        });
      }
    }

    this.lblTotal = 0;
    for (var i = 0; i < this.productPurchaseTable.tableData.length; i++) {
      this.lblTotal += this.productPurchaseTable.tableData[i].total;
    }

    this.formFields[8].value = -this.lblTotal;

    this.productPurchaseTable.calculateTotal();
  }

  totalBill() {
    this.lblTotal = 0;
    for (var i = 0; i < this.productPurchaseTable.tableData.length; i++) {
      this.lblTotal += parseInt(this.productPurchaseTable.tableData[i].total);
      // +
      // parseInt(this.productPurchaseTable.tableData[i].stAmount) +
      // parseInt(this.productPurchaseTable.tableData[i].adtAmount);
    }

    this.formFields[8].value = -this.lblTotal;
    this.changeValue();

    this.cmbProduct = '';
    this.searchProduct = '';
  }

  changeValue() {
    if (this.formFields[8].value == '') {
      this.formFields[8].value = 0;
    }
    if (this.formFields[6].value == '') {
      this.formFields[6].value = 0;
    }
    if (this.formFields[7].value == '') {
      this.formFields[7].value = 0;
    }

    this.formFields[8].value =
      parseInt(this.formFields[6].value) +
      parseInt(this.formFields[7].value) -
      this.lblTotal;
  }

  // save(printSection: string) {
  save() {
    this.lblCash = this.formFields[7].value;

    this.formFields[10].value = JSON.stringify(
      this.productPurchaseTable.tableData
    );

    if (this.productPurchaseTable.tableData.length == 0) {
      this.valid.apiInfoResponse('enter products');
      return;
    }
    if (
      (this.formFields[3].value == '' || this.formFields[3].value == '0') &&
      this.formFields[7].value == 0
    ) {
      this.valid.apiInfoResponse('enter cash');
      return;
    }

    if (this.formFields[3].value == '') {
      var cash =
        parseInt(this.formFields[6].value) + parseInt(this.formFields[7].value);
      if (this.lblTotal > cash) {
        this.valid.apiInfoResponse('enter correct cash');
        return;
      }
    }

    // if(this.formFields[4].value == ''){
    //   this.formFields[4].value = 'NULL';
    // }

    if (this.lblTotal < parseInt(this.formFields[6].value)) {
      this.formFields[6].value =
        parseInt(this.formFields[6].value) - parseInt(this.formFields[8].value);
    }

    this.dataService
      .savetHttp(
        this.pageFields,
        this.formFields,
        'core-api/Purchase/savePurchase'
      )
      .subscribe(
        (response: any) => {
          console.log(response);
          if (response.message == 'Success') {
            this.valid.apiInfoResponse('record saved successfully');

            // this.printSale.tableData = this.productSaleTable.tableData;

            // this.printSale.lblInvoice = response.invoiceNo;
            // this.printSale.lblDate = date;
            // this.printSale.lblGTotal = this.lblTotal;
            // this.printSale.lblDiscount = this.formFields[6].value;
            // this.printSale.lblCash = this.lblCash;
            // this.printSale.lblChange = this.formFields[8].value;

            // setTimeout(()=> this.globalService.printData(printSection), 200);
            this.getInvoice(this.startDate, this.endDate);
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
  }

  getInvoiceOnClick() {
    this.startDate = new Date();
    this.endDate = new Date();

    this.getInvoice(this.startDate, this.endDate);
  }

  checkPurchaseReturn() {
    if (this.productPurchaseTable.tableData.length == 0) {
      this.valid.apiInfoResponse('enter products');
      return;
    }

    $('#purchaseReturnModal').modal('show');
  }

  purchaseReturn() {
    this.dataService
      .getHttp(
        'core-api/Purchase/getPurchaseReturn?invoiceNo=' +
          this.lblInvoiceNo +
          '&userID=' +
          this.globalService.getUserId() +
          '&moduleId=' +
          this.moduleId +
          '&branchID=' +
          this.globalService.getBranchID(),
        ''
      )
      .subscribe(
        (response: any) => {
          if (response.length == 0) {
            this.valid.apiInfoResponse('no invoice found');
            return;
          } else {
            let result = this.productPurchaseTable.tableData.filter(
              (r1: { productID: any; qty: any }) =>
                response.some(
                  (r2: { productID: any; qty: any }) =>
                    r1.productID === r2.productID && r1.qty <= r2.qty
                )
            );

            if (this.productPurchaseTable.tableData.length == result.length) {
              this.lblCash = this.formFields[7].value;

              this.formFields[3].value = this.lblInvoiceNo;
              this.formFields[4].value = new Date();

              this.formFields[10].value = JSON.stringify(
                this.productPurchaseTable.tableData
              );

              this.dataService
                .savetHttp(
                  this.pageFields,
                  this.formFields,
                  'core-api/Purchase/savePurchaseReturn?userID=' +
                    this.globalService.getUserId() +
                    '&moduleId=' +
                    this.moduleId
                )
                .subscribe(
                  (response: any) => {
                    console.log(response);
                    if (response.message == 'Success') {
                      this.valid.apiInfoResponse('record saved successfully');

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
    this.formFields[2].value = new Date();
    this.formFields[3].value = '';
    this.formFields[4].value = '';
    this.formFields[5].value = '';
    this.formFields[6].value = '0';
    this.formFields[7].value = '0';
    this.formFields[8].value = '0';
    this.formFields[9].value = '';

    this.lblInvoiceNo = 0;
    this.searchProduct = '';
    this.cmbProduct = '';
    this.lblTotal = 0;
    this.lblCash = 0;
    this.productPurchaseTable.tableData = [];

    this.productPurchaseTable.lblTotalQty = 0;
    this.productPurchaseTable.lblTotalCostPrice = 0;
    this.productPurchaseTable.lblTotalSalePrice = 0;
    this.productPurchaseTable.lblTotalDiscount = 0;
    this.productPurchaseTable.lblTotal = 0;
    this.productPurchaseTable.lblTotalAdtAmount = 0;
    this.productPurchaseTable.lblTotalStAmount = 0;

    this.txtCode = '';
    $('#purchaseReturnModal').modal('hide');
  }
}
