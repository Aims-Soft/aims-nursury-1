import { SharedHelpersFieldValidationsModule } from '@aims-pos/shared/helpers/field-validations';
import { MyFormField } from '@aims-pos/shared/interface';
import { SharedServicesDataModule } from '@aims-pos/shared/services/data';
import { SharedServicesGlobalDataModule } from '@aims-pos/shared/services/global-data';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'aims-pos-company-table',
  templateUrl: './company-table.component.html',
  styleUrls: ['./company-table.component.scss'],
})
export class CompanyTableComponent implements OnInit {
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
    this.getCompany();
  }

  getCompany() {
    this.dataService.getHttp('cmis-api/Company/getCompany', '').subscribe(
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
      companyID: '0',
      userID: '',
    };

    var formFields: MyFormField[] = [
      {
        value: pageFields.companyID,
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

    formFields[0].value = item.companyID;
    formFields[1].value = this.globalService.getUserId().toString();

    this.dataService
      .deleteHttp(pageFields, formFields, 'cmis-api/Company/deleteCompany')
      .subscribe(
        (response: any) => {
          if (response.message == 'Success') {
            this.valid.apiInfoResponse('Record deleted successfully');
            this.getCompany();
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
