import { SharedHelpersFieldValidationsModule } from '@aims-pos/shared/helpers/field-validations';
import { MyFormField, NewSalePartyInterface } from '@aims-pos/shared/interface';
import { SharedServicesDataModule } from '@aims-pos/shared/services/data';
import { SharedServicesGlobalDataModule } from '@aims-pos/shared/services/global-data';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'aims-pos-add-custoomer',
  templateUrl: './add-custoomer.component.html',
  styleUrls: ['./add-custoomer.component.scss'],
})
export class AddCustoomerComponent implements OnInit {
  @Output() eventEmitter = new EventEmitter();
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) {}

  cnicMask = this.globalService.cnicMask();
  mobileMask = this.globalService.mobileMask();
  pageFields: NewSalePartyInterface = {
    partyID: '0',
    userID: '',
    partyName: '',
    cnic: '',
    mobile: '',
    moduleId: '', //5
    branchID: '',
    businessid: '', //7
    companyid: '', //8
  };

  formFields: MyFormField[] = [
    {
      value: this.pageFields.partyID,
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
      value: this.pageFields.partyName,
      msg: 'enter party name',
      type: 'textbox',
      required: true,
    },
    {
      value: this.pageFields.cnic,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFields.mobile,
      msg: 'enter mobile',
      type: 'mobile',
      required: true,
    },
    {
      value: this.pageFields.moduleId,
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
      value: this.pageFields.businessid,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFields.companyid,
      msg: '',
      type: 'hidden',
      required: false,
    },
  ];

  error: any;
  ngOnInit(): void {
    this.formFields[1].value = this.globalService.getUserId().toString();
    this.formFields[5].value = localStorage.getItem('moduleId');
    this.formFields[6].value = this.globalService.getBranchID();
    this.formFields[7].value = this.globalService.getBusinessID();
    this.formFields[8].value = this.globalService.getCompanyID();
  }
  save() {
    this.dataService
      .savetHttp(
        this.pageFields,
        this.formFields,
        'core-api/Party/saveCustomerSale'
      )
      .subscribe(
        (response: any) => {
          if (response.message == 'Success') {
            if (this.formFields[0].value > 0) {
              this.valid.apiInfoResponse(' updated successfully');
            } else {
              this.valid.apiInfoResponse(' created successfully');
            }
            this.eventEmitter.emit();
            this.reset();
            this.closeModal.emit();
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
    this.formFields = this.valid.resetFormFields(this.formFields);
    this.formFields[0].value = '0';
    this.formFields[3].value = '';
  }
}
