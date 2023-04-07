import { SharedHelpersFieldValidationsModule } from '@aims-pos/shared/helpers/field-validations';
import { CheckoutInterface, MyFormField } from '@aims-pos/shared/interface';
import { SharedServicesDataModule } from '@aims-pos/shared/services/data';
import { SharedServicesGlobalDataModule } from '@aims-pos/shared/services/global-data';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'aims-pos-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  
  @Input() checkOutList: any = [];
  @Input() totalPrice: any = 0;

  pageFields: CheckoutInterface = {
    customerName: '',
    email: '',
    mobile: '',
    address: '',
    status: '',
    json: '',
  };
  
  formFields: MyFormField[] = [
    {
      value: this.pageFields.customerName,
      msg: 'enter name',
      type: 'name',
      required: true,
    },
    {
      value: this.pageFields.email,
      msg: 'enter email',
      type: 'textBox',
      required: true,
    },
    {
      value: this.pageFields.mobile,
      msg: 'enter mobile',
      type: 'textBox',
      required: true,
    },
    {
      value: this.pageFields.address,
      msg: 'enter address',
      type: 'textBox',
      required: true,
    },
    {
      value: this.pageFields.status,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFields.json,
      msg: 'enter list item',
      type: 'textBox',
      required: true,
    },
  ];

  error: any;
  mobileMask = this.globalService.mobileMask();

  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule,
  ) { }

  ngOnInit(): void {
  }

  returnToMain(){
    this.globalService.setCheckFound(false);
  }

  checkOut(){

    if(this.checkOutList.length == 0){
      this.valid.apiErrorResponse('enter list items');
      return;
    }
    this.formFields[5].value = JSON.stringify(this.checkOutList);
    this.dataService
    .savetHttp(
      this.pageFields,
      this.formFields,
      'bachat-online-api/Product/checkout'
    )
    .subscribe(
      (response: any) => {
        console.log(response);
        if(response.message == 'Success'){

          this.valid.apiInfoResponse('Your order placed successfully');

          this.reset();
        }else{
          this.valid.apiErrorResponse(response.toString());
        }
      },
      (error: any) => {
        this.error = error;
        this.valid.apiErrorResponse(this.error);
      }
    );
  }

  reset(){

    this.formFields = this.valid.resetFormFields(this.formFields);

    this.globalService.setCheckFound(false);
    this.globalService.setCartQty('');
    this.globalService.setCartTotal('0.0');
    this.checkOutList = '';
    this.totalPrice = 0;
  }
}
