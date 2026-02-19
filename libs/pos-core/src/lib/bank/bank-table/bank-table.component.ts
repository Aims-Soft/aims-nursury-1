import { SharedHelpersFieldValidationsModule } from '@aims-pos/shared/helpers/field-validations';
import { MyFormField } from '@aims-pos/shared/interface';
import { SharedServicesDataModule } from '@aims-pos/shared/services/data';
import { SharedServicesGlobalDataModule } from '@aims-pos/shared/services/global-data';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'aims-pos-bank-table',
  templateUrl: './bank-table.component.html',
  styleUrls: ['./bank-table.component.scss'],
})
export class BankTableComponent implements OnInit {
  @Output() eventEmitter = new EventEmitter();
  @Output() eventEmitterDelete = new EventEmitter();

  error: any;
  tableData: any = [];
  moduleId: string | null;
  txtSearch: any;
  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) {}

  ngOnInit(): void {
    this.moduleId = localStorage.getItem('moduleId');
    this.getBank();
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
          this.tableData = response;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  edit(item: any) {
    this.eventEmitter.emit(item);
  }

  delete(item: any) {
    this.eventEmitterDelete.emit(item);

    var pageFields = {
      bankID: '0',
      userID: '',
      coaID: '',
      moduleId: '',
    };

    var formFields: MyFormField[] = [
      {
        value: pageFields.bankID,
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
        value: pageFields.coaID,
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

    formFields[0].value = item.bankID;
    formFields[1].value = this.globalService.getUserId().toString();
    formFields[2].value = item.coaID;
    formFields[3].value = this.moduleId;

    this.dataService
      .deleteHttp(pageFields, formFields, 'core-api/Bank/deleteBank')
      .subscribe(
        (response: any) => {
          if (response.message == 'Success') {
            this.valid.apiInfoResponse('Record deleted successfully');
            this.getBank();
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
}
