import { SharedHelpersFieldValidationsModule } from '@aims-pos/shared/helpers/field-validations';
import { MyFormField } from '@aims-pos/shared/interface';
import { SharedServicesDataModule } from '@aims-pos/shared/services/data';
import { SharedServicesGlobalDataModule } from '@aims-pos/shared/services/global-data';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'aims-pos-branch-table',
  templateUrl: './branch-table.component.html',
  styleUrls: ['./branch-table.component.scss'],
})
export class BranchTableComponent implements OnInit {
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
    this.getBranch();
  }

  getBranch() {
    this.dataService
      .getHttp(
        'cmis-api/Branch/getBranch?businessID=' +
          this.globalService.getBusinessID(),
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
    this.eventEmitterDelete.emit();

    var pageFields = {
      branchID: '0',
      businessBranchID: '0',
      userID: '',
    };

    var formFields: MyFormField[] = [
      {
        value: pageFields.branchID,
        msg: '',
        type: 'hidden',
        required: false,
      },
      {
        value: pageFields.businessBranchID,
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

    formFields[0].value = item.branchID;
    formFields[1].value = item.businessBranchID;
    formFields[2].value = this.globalService.getUserId().toString();

    this.dataService
      .deleteHttp(pageFields, formFields, 'cmis-api/Branch/deleteBranch')
      .subscribe(
        (response: any) => {
          if (response.message == 'Success') {
            this.valid.apiInfoResponse('Record deleted successfully');
            this.getBranch();
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
