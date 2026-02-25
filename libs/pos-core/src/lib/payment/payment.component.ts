import { SharedHelpersFieldValidationsModule } from '@aims-pos/shared/helpers/field-validations';
import { MyFormField, PaymentInterface } from '@aims-pos/shared/interface';
import { SharedServicesDataModule } from '@aims-pos/shared/services/data';
import { SharedServicesGlobalDataModule } from '@aims-pos/shared/services/global-data';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PaymentTableComponent } from './payment-table/payment-table.component';

@Component({
  selector: 'aims-pos-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  @ViewChild(PaymentTableComponent) paymentTable: any;

  roleID: any = 0;
  partySearch: any;
  categorySearch: any;
  coaSearch: any;

  pageFields: PaymentInterface = {
    invoiceNo: '0', //0
    userID: '', //1
    type: '', //2
    partyID: '', //3
    invoiceDate: '', //4
    categoryID: '', //5
    coaID: '', //6
    amount: '0', //7
    discount: '0', //8
    description: '', //9
    companyid: '', //10
    businessid: '', //11
    branchid: '', //12
    moduleId: '', //13
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
      value: this.pageFields.type,
      msg: 'select payment type',
      type: 'radio',
      required: true,
    },
    {
      value: this.pageFields.partyID,
      msg: 'select party name',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFields.invoiceDate,
      msg: 'select date',
      type: 'date',
      required: true,
    },
    {
      value: this.pageFields.categoryID,
      msg: 'select category',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFields.coaID,
      msg: 'select acoount head',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFields.amount,
      msg: 'enter amount',
      type: 'textbox',
      required: false,
    },
    {
      value: this.pageFields.discount,
      msg: 'enter discount',
      type: 'textbox',
      required: false,
    },
    {
      value: this.pageFields.description,
      msg: 'enter description',
      type: 'textbox',
      required: false,
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
  ];

  tabIndex = 0;
  error: any;

  companyList: any = [];
  businessList: any = [];
  branchList: any = [];
  partyList: any = [];
  coaList: any = [];
  categoryList: any = [];
  moduleId: string | null;
  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) {}

  ngOnInit(): void {
    this.formFields[1].value = this.globalService.getUserId().toString();
    this.moduleId = localStorage.getItem('moduleId');
    this.formFields[13].value = localStorage.getItem('moduleId');
    this.formFields[2].value = '1';

    this.roleID = this.globalService.getRoleId();
    this.globalService.setHeaderTitle('Payments & Receipts');
    this.getCompany();
    this.getParty();
    this.getChartOfAccount();
    this.getCOASubTypeWise();
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
      companyID = this.formFields[10].value;
    } else {
      companyID = this.globalService.getCompanyID();
    }
    this.dataService
      .getHttp('cmis-api/Business/getBusiness?companyID=' + companyID, '')
      .subscribe(
        (response: any) => {
          this.businessList = response;
          if (this.globalService.getRoleId() != 1) {
            this.formFields[10].value = this.globalService.getCompanyID();
            this.formFields[11].value = this.globalService.getBusinessID();
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
      businessID = this.formFields[11].value;
    } else {
      businessID = this.globalService.getBusinessID();
      if (this.formFields[11].value == '') {
        this.formFields[11].value = this.globalService.getBusinessID();
      }
    }

    this.dataService
      .getHttp('cmis-api/Branch/getBranch?businessID=' + businessID, '')
      .subscribe(
        (response: any) => {
          this.branchList = response;
          if (this.globalService.getRoleId() != 1) {
            this.formFields[12].value = this.globalService.getBranchID();
          }
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  getCOASubTypeWise() {
    this.dataService
      .getHttp(
        'core-api/ChartOfAccount/getCOASubTypeWise?companyID=' +
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
          this.categoryList = response;
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

  getChartOfAccount() {
    this.dataService
      .getHttp(
        'core-api/ChartOfAccount/getCOA??companyID=' +
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
          this.coaList = response;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  getPaymentDetail(invoiceNo: any, type: any) {
    this.dataService
      .getHttp(
        'core-api/Payment/getPaymentDetail?invoiceNo=' +
          invoiceNo +
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
          if (response.length == 3) {
            if (type == 'payment') {
              this.formFields[5].value = response[1].coaID; //categoryID (cash bank)
              this.formFields[6].value = response[2].coaID; //chart of account
            } else {
              this.formFields[5].value = response[1].coaID; //categoryID (cash bank)
              this.formFields[6].value = response[2].coaID; //chart of account
            }
          } else if (response.length == 2) {
            if (type == 'payment') {
              this.formFields[5].value = response[0].coaID; //categoryID (cash bank)
              this.formFields[6].value = response[1].coaID; //chart of account
            } else {
              this.formFields[5].value = response[0].coaID; //categoryID (cash bank)
              this.formFields[6].value = response[1].coaID; //chart of account
            }
          }
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  save() {
    if (this.globalService.getRoleId() > 1) {
      this.formFields[12].value = this.globalService.getBranchID();
    }

    if (this.formFields[8].value == '' || this.formFields[8].value == '0') {
      this.formFields[8].value = '0';
    }

    if (this.formFields[0].value == '0') {
      this.dataService
        .savetHttp(
          this.pageFields,
          this.formFields,
          'core-api/Payment/savePayment'
        )
        .subscribe(
          (response: any) => {
            console.log(response);
            if (response.message == 'Success') {
              this.valid.apiInfoResponse('Record saved successfully');

              this.paymentTable.getPayment();
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
          'core-api/Payment/updatePayment?userID=' +
            this.globalService.getUserId() +
            '&moduleId=' +
            this.moduleId
        )
        .subscribe(
          (response: any) => {
            console.log(response);
            if (response.message == 'Success') {
              this.valid.apiInfoResponse('Record updated successfully');

              this.paymentTable.getPayment();
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
    this.formFields[7].value = '0';
    this.formFields[8].value = '0';
    this.formFields[9].value = '';
    this.formFields[10].value = '';
    this.formFields[11].value = '';
    this.formFields[12].value = '';
    this.formFields[2].value = '1';
  }

  edit(item: any) {
    this.tabIndex = 0;

    this.getPaymentDetail(item.invoiceNo, item.invoiceType);
    this.formFields[0].value = item.invoiceNo;

    if (item.invoiceType == 'payment') {
      this.formFields[2].value = '1'; //type
    } else {
      this.formFields[2].value = '2'; //type
    }
    this.formFields[3].value = item.partyID;
    this.formFields[4].value = new Date(item.invoiceDate);
    this.formFields[7].value = item.cashReceived;
    this.formFields[8].value = item.discount;
    this.formFields[9].value = item.description;
    this.formFields[10].value = item.companyid;
    this.formFields[11].value = item.businessid;
    this.formFields[12].value = item.branchid;
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
