import { SharedHelpersFieldValidationsModule } from '@aims-pos/shared/helpers/field-validations';
import { BachatProductInterface, MyFormField } from '@aims-pos/shared/interface';
import { SharedServicesDataModule } from '@aims-pos/shared/services/data';
import { SharedServicesGlobalDataModule } from '@aims-pos/shared/services/global-data';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
declare var $: any;
@Component({
  selector: 'aims-pos-bachat-online-stock',
  templateUrl: './bachat-online-stock.component.html',
  styleUrls: ['./bachat-online-stock.component.scss']
})
export class BachatOnlineStockComponent implements OnInit {

  tblSearch: any = '';
  tableData: any = [];
  orderDetailList: any = [];

  txtPin: any = '';

  lblOrder:any = '';

  dtpFromDate: string = '';
  dtpToDate: string = '';

  pageFields: BachatProductInterface = {
    id: '',
    name: '',
    price: '',
    inventory: '',
  };
  
  formFields: MyFormField[] = [
    {
      value: this.pageFields.id,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFields.name,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFields.price,
      msg: '',
      type: 'textBox',
      required: false,
    },
    {
      value: this.pageFields.inventory,
      msg: '',
      type: 'textBox',
      required: false,
    },
  ];

  error: any;

  status: any = 'pend';
  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule,
    private datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    // this.globalService.setHeaderTitle("Bachat Online Stock");

    this.getOnlineProduct();
  }

  getOnlineProduct(){
    this.dataService.getHttp('bachat-online-api/Product/getPlaceOrder', '').subscribe((response: any) => {
      this.tableData = response;
    }, (error: any) => {
      console.log(error);
    });
  }

  getOrderDetail(item: any){
    this.dataService.getHttp('bachat-online-api/Product/getOrderDetail?orderID=' + item.orderID, '').subscribe((response: any) => {
      this.orderDetailList = response;
      $("#orderDetailModal").modal('show');
    }, (error: any) => {
      console.log(error);
    });
  }
  // getAttendance(){
  //   var fromDate = this.datepipe.transform(this.dtpFromDate, 'dd-MM-yyyy');
  //   var toDate = this.datepipe.transform(this.dtpToDate, 'dd-MM-yyyy');

  //   this.dataService.getAttendanceHttp('Attendance/getAttendance?fromDate='+ fromDate +'&toDate='+ toDate, '').subscribe((response: any) => {
  //     this.tableData = response;
  //   }, (error: any) => {
  //     console.log(error);
  //   });
  // }

  checkPin(item: any){
    if(this.globalService.getPinCode() == null || this.globalService.getPinCode() == '0'){
      this.valid.apiErrorResponse('Pin not allowed');return;
    }else{
      $('#pinModal').modal('show');
      this.lblOrder = item.orderID;
    }
  }

  pin(){
    if(this.txtPin == ''){
      this.valid.apiErrorResponse('enter pin');return;
    }else{
      this.dataService.getHttp('user-api/User/getPin?pin=' + this.txtPin + '&userID=' + this.globalService.getUserId(), '').subscribe((response: any) => {
        if(response.length == 0){
          this.valid.apiErrorResponse('Invlaid pin');return;
        }else{

          var pageFields = {
            status: '',
            orderID: ''
          };
      
          var formFields: MyFormField[] = [
            {
              value: pageFields.status,
              msg: '',
              type: 'hidden',
              required: false,
            },
            {
              value: pageFields.orderID,
              msg: '',
              type: 'hidden',
              required: false,
            }
          ];
      
          formFields[0].value = 'pend';
          formFields[1].value = this.lblOrder;
      
          this.dataService
            .deleteHttp(
              pageFields,
              formFields,
              'bachat-online-api/Product/placeOrder'
            )
            .subscribe(
              (response: any) => {
                if(response.message == "Success"){
                  this.valid.apiInfoResponse('Order placed successfully');
                  $('#pinModal').modal('hide');
                  this.lblOrder = '';
                  this.txtPin = '';
                  this.getOnlineProduct();
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
      }, (error: any) => {
        console.log(error);
      });
    }
  }

  deliverOrder(item: any){

    var pageFields = {
      status: '',
      orderID: ''
    };

    var formFields: MyFormField[] = [
      {
        value: pageFields.status,
        msg: '',
        type: 'hidden',
        required: false,
      },
      {
        value: pageFields.orderID,
        msg: '',
        type: 'hidden',
        required: false,
      }
    ];

    formFields[0].value = 'comp';
    formFields[1].value = item.orderID;

    this.dataService
      .deleteHttp(
        pageFields,
        formFields,
        'bachat-online-api/Product/placeOrder'
      )
      .subscribe(
        (response: any) => {
          if(response.message == "Success"){
            this.valid.apiInfoResponse('Order send successfully');
            this.getOnlineProduct();
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
