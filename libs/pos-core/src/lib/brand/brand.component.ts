import { SharedHelpersFieldValidationsModule } from '@aims-pos/shared/helpers/field-validations';
import { BrandInterface, MyFormField } from '@aims-pos/shared/interface';
import { SharedServicesDataModule } from '@aims-pos/shared/services/data';
import { SharedServicesGlobalDataModule } from '@aims-pos/shared/services/global-data';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BrandTableComponent } from './brand-table/brand-table.component';

@Component({
  selector: 'aims-pos-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {

  @ViewChild(BrandTableComponent) brandTable: any;
  
  pageFields: BrandInterface = {
    brandID: '0',
    userID: '',
    brandName: '',
    description: '',
  };

  formFields: MyFormField[] = [
    {
      value: this.pageFields.brandID,
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
      value: this.pageFields.brandName,
      msg: 'enter brand name',
      type: 'name',
      required: true,
    },
    {
      value: this.pageFields.description,
      msg: '',
      type: 'textbox',
      required: false,
    }
  ];
  
  error: any;

  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) {}

  ngOnInit(): void {
    this.formFields[1].value = this.globalService.getUserId().toString();
  }

  save() {
    this.dataService
    .savetHttp(
      this.pageFields,
      this.formFields,
      'core-api/Brand/saveBrand'
    )
    .subscribe(
      (response: any) => {
        console.log(response);
        if(response.message == 'Success'){
          if(this.formFields[0].value == '0'){
            this.valid.apiInfoResponse('Record saved successfully');
          }else{
            this.valid.apiInfoResponse('Record updated successfully');
          }

          this.brandTable.getBrand();
          this.reset();
        }else{
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
    this.formFields[3].value = '';
  }

  edit(item: any){
    this.formFields[0].value = item.brandID;
    this.formFields[2].value = item.brandName;
    this.formFields[3].value = item.description;
  }

  getKeyPressed(e: any){
    if(e.keyCode == 13){
      this.save();
    }
  }

  delete(item: any){
    this.reset();
  }
}
