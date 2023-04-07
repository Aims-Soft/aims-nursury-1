import { SharedHelpersFieldValidationsModule } from '@aims-pos/shared/helpers/field-validations';
import { MyFormField } from '@aims-pos/shared/interface';
import { SharedServicesDataModule } from '@aims-pos/shared/services/data';
import { SharedServicesGlobalDataModule } from '@aims-pos/shared/services/global-data';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'aims-pos-city-table',
  templateUrl: './city-table.component.html',
  styleUrls: ['./city-table.component.scss']
})
export class CityTableComponent implements OnInit {

  @Output() eventEmitter = new EventEmitter();

  error: any;
  tableData: any = [];

  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) { }

  ngOnInit(): void {
    this.getCity();
  }

  getCity() {
    this.dataService.getHttp('core-api/City/getCity', '').subscribe(
      (response: any) => {
        this.tableData = response.reverse();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  edit(item: any){
    this.eventEmitter.emit(item);
  }

  delete(item: any){
    var pageFields = {
      cityID: '0',
      userID: '',
    };

    var formFields: MyFormField[] = [
      {
        value: pageFields.cityID,
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

    formFields[0].value = item.cityID;
    formFields[1].value = this.globalService.getUserId().toString();

    this.dataService
      .deleteHttp(
        pageFields,
        formFields,
        'core-api/City/deleteCity'
      )
      .subscribe(
        (response: any) => {
          if(response.message == "Success"){
            this.valid.apiInfoResponse('Record deleted successfully');
            this.getCity();
          }else{
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
