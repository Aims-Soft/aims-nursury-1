import { SharedHelpersFieldValidationsModule } from '@aims-pos/shared/helpers/field-validations';
import { MyFormField } from '@aims-pos/shared/interface';
import { SharedServicesDataModule } from '@aims-pos/shared/services/data';
import { SharedServicesGlobalDataModule } from '@aims-pos/shared/services/global-data';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'aims-pos-role-creation-table',
  templateUrl: './role-creation-table.component.html',
  styleUrls: ['./role-creation-table.component.scss'],
})
export class RoleCreationTableComponent implements OnInit {
  @Output() eventEmitter = new EventEmitter();
  @Output() eventEmitterDelete = new EventEmitter();

  tableData: any = [];
  error: any;

  constructor(
    private global: SharedServicesGlobalDataModule,
    private dataService: SharedServicesDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) {}

  ngOnInit(): void {
    this.getRoles();
  }

  getRoles() {
    this.dataService
      .getHttp(
        'user-api/Role/getRoles?businessID=' + this.global.getBusinessID(),
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
      new_role_id: '0',
      userID: '',
      spType: '',
    };

    var formFields: MyFormField[] = [
      {
        value: pageFields.new_role_id,
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
        value: pageFields.spType,
        msg: '',
        type: 'hidden',
        required: false,
      },
    ];

    formFields[0].value = item.roleId;
    formFields[1].value = this.global.getUserId().toString();
    formFields[2].value = 'delete';

    this.dataService
      .deleteHttp(pageFields, formFields, 'user-api/Role/deleteRole')
      .subscribe(
        (response: any) => {
          // console.log(response);
          if (response.message == 'Success') {
            this.valid.apiInfoResponse('Record deleted successfully');
            this.getRoles();
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
