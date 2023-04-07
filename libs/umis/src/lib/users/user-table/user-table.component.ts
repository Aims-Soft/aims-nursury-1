import { SharedHelpersFieldValidationsModule } from '@aims-pos/shared/helpers/field-validations';
import { MyFormField } from '@aims-pos/shared/interface';
import { SharedServicesDataModule } from '@aims-pos/shared/services/data';
import { SharedServicesGlobalDataModule } from '@aims-pos/shared/services/global-data';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'aims-pos-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent implements OnInit {
  @Input() tblSearch: any = '';
  @Output() eventEmitter = new EventEmitter();
  @Output() eventEmitterDelete = new EventEmitter();

  lblUserName: any = '';

  tableData: any = [];
  error: any;

  constructor(
    private global: SharedServicesGlobalDataModule,
    private dataService: SharedServicesDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) {}

  ngOnInit(): void {}

  edit(item: any) {
    this.eventEmitter.emit(item);
  }

  delete(item: any) {
    var pageFields = {
      userID: '0',
      spType: '',
    };

    var formFields: MyFormField[] = [
      {
        value: pageFields.userID,
        msg: '',
        type: 'hidden',
        required: false,
      },
      {
        value: pageFields.spType,
        msg: '',
        type: 'hidden',
        required: false,
      },
    ];

    formFields[0].value = item.userID;
    formFields[1].value = 'delete';

    this.dataService
      .deleteHttp(pageFields, formFields, 'user-api/User/deleteUser')
      .subscribe(
        (response: any) => {
          if (response.message == 'Success') {
            this.valid.apiInfoResponse('Record deleted successfully');
            this.eventEmitterDelete.emit(item);
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
