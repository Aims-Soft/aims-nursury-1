import { SharedHelpersFieldValidationsModule } from '@aims-pos/shared/helpers/field-validations';
import { MyFormField } from '@aims-pos/shared/interface';
import { SharedServicesDataModule } from '@aims-pos/shared/services/data';
import { SharedServicesGlobalDataModule } from '@aims-pos/shared/services/global-data';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'aims-pos-chart-of-account-table',
  templateUrl: './chart-of-account-table.component.html',
  styleUrls: ['./chart-of-account-table.component.scss'],
})
export class ChartOfAccountTableComponent implements OnInit {
  @Output() eventEmitter = new EventEmitter();
  @Output() eventEmitterDelete = new EventEmitter();

  error: any;
  tableData: any = [];

  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) {}

  ngOnInit(): void {
    this.getCOA();
  }

  getCOA() {
    this.dataService
      .getHttp(
        'fmis-api/ChartOfAccount/getCOA?companyID=' +
          this.globalService.getCompanyID() +
          '&businessID=' +
          this.globalService.getBusinessID(),
        ''
      )
      .subscribe(
        (response: any) => {
          this.tableData = response.reverse();
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
      coaID: '0',
      userID: '',
    };

    var formFields: MyFormField[] = [
      {
        value: pageFields.coaID,
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

    formFields[0].value = item.coaID;
    formFields[1].value = this.globalService.getUserId().toString();

    this.dataService
      .deleteHttp(pageFields, formFields, 'fmis-api/ChartOfAccount/deleteCOA')
      .subscribe(
        (response: any) => {
          if (response.message == 'Success') {
            this.valid.apiInfoResponse('Record deleted successfully');
            this.getCOA();
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
