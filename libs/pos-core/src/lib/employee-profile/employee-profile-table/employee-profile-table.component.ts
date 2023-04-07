import { SharedHelpersFieldValidationsModule } from '@aims-pos/shared/helpers/field-validations';
import { MyFormField } from '@aims-pos/shared/interface';
import { SharedServicesDataModule } from '@aims-pos/shared/services/data';
import { SharedServicesGlobalDataModule } from '@aims-pos/shared/services/global-data';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'aims-pos-employee-profile-table',
  templateUrl: './employee-profile-table.component.html',
  styleUrls: ['./employee-profile-table.component.scss'],
})
export class EmployeeProfileTableComponent implements OnInit {
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
    this.getEmployee();
  }

  getEmployee() {
    this.dataService
      .getHttp(
        'core-api/Employee/getEmployee?companyID=' +
          this.globalService.getCompanyID() +
          '&businessID=' +
          this.globalService.getBusinessID(),
        ''
      )
      .subscribe(
        (response: any) => {
          this.tableData = response;
          console.log(response);
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
      partyID: '0',
      userID: '',
    };

    var formFields: MyFormField[] = [
      {
        value: pageFields.partyID,
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

    formFields[0].value = item.partyID;
    formFields[1].value = this.globalService.getUserId().toString();

    this.dataService
      .deleteHttp(pageFields, formFields, 'core-api/Party/deleteParty')
      .subscribe(
        (response: any) => {
          if (response.message == 'Success') {
            this.valid.apiInfoResponse('Record deleted successfully');
            this.getEmployee();
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
