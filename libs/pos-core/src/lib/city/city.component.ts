import { SharedHelpersFieldValidationsModule } from '@aims-pos/shared/helpers/field-validations';
import { CityInterface, MyFormField } from '@aims-pos/shared/interface';
import { SharedServicesDataModule } from '@aims-pos/shared/services/data';
import { SharedServicesGlobalDataModule } from '@aims-pos/shared/services/global-data';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CityTableComponent } from './city-table/city-table.component';

@Component({
  selector: 'aims-pos-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss'],
})
export class CityComponent implements OnInit {
  @ViewChild(CityTableComponent) cityTable: any;

  pageFields: CityInterface = {
    cityID: '0',
    userID: '',
    cityName: '',
    moduleId: '',
  };

  formFields: MyFormField[] = [
    {
      value: this.pageFields.cityID,
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
      value: this.pageFields.cityName,
      msg: 'enter city name',
      type: 'name',
      required: true,
    },
    {
      value: this.pageFields.moduleId,
      msg: '',
      type: 'hidden',
      required: false,
    },
  ];

  error: any;

  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) {}

  ngOnInit(): void {
    this.formFields[1].value = this.globalService.getUserId().toString();
    this.formFields[3].value = localStorage.getItem('moduleId');
    this.globalService.setHeaderTitle('City');
  }

  save() {
    this.dataService
      .savetHttp(this.pageFields, this.formFields, 'core-api/City/saveCity')
      .subscribe(
        (response: any) => {
          console.log(response);
          if (response.message == 'Success') {
            if (this.formFields[0].value == '0') {
              this.valid.apiInfoResponse('Record saved successfully');
            } else {
              this.valid.apiInfoResponse('Record updated successfully');
            }

            this.cityTable.getCity();
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

  reset() {
    this.formFields = this.valid.resetFormFields(this.formFields);

    this.formFields[0].value = '0';
  }

  edit(item: any) {
    this.formFields[0].value = item.cityID;
    this.formFields[2].value = item.cityName;
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
