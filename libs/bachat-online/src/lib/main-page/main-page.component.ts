import { SharedHelpersFieldValidationsModule } from '@aims-pos/shared/helpers/field-validations';
import { SharedServicesDataModule } from '@aims-pos/shared/services/data';
import { SharedServicesGlobalDataModule } from '@aims-pos/shared/services/global-data';
import { Component, OnInit } from '@angular/core';
import { environment } from "apps/aims-pos/src/environments/environment"
declare var $: any;
@Component({
  selector: 'aims-pos-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  checkoutFound: any;

  total: any = 0;
  cartList: any = [];
  tempImg = '../assets/ui/productPictures/noImage.png';
  
  productList: any = [];

  found = false;
  index = 0;
  
  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule,
  ) { }

  ngOnInit(): void {
    this.total = 0;
    // this.globalService.setCartQty(this.cartList.length);
    // this.globalService.setCartTotal(this.total);
    this.globalService.checkFound$$.subscribe(value => this.checkoutFound = value);
    
    this.getOnlineProduct();
    
  }

  getOnlineProduct(){
    this.dataService.getHttp('bachat-online-api/Product/getOnlineProduct', '').subscribe((response: any) => {
      this.productList = response;
    }, (error: any) => {
      console.log(error);
    });
  }
  addCartItem(item: any){
    item.qty = parseInt(item.qty) + 1;

    if(this.cartList.length > 0){
      this.found = false;
          this.index = 0;
          for(var i = 0; i < this.cartList.length; i++){
            if(this.cartList[i].productName == item.productName){
              this.found = true;
              this.index = i;
              i = this.cartList.length + 1;
            }
          }
          if(this.found == true){
            this.dataService.getHttp('bachat-online-api/Product/getCheckQty?invoiceDetailID=' + item.invoiceDetailID + '&qty=' + item.qty, '').subscribe((response: any) => {
        
              if(response['msg'] == true){
                this.cartList[this.index].qty = parseInt(item.qty);

                this.total = 0;
                for(var i = 0; i < this.cartList.length; i++){
                  this.total = parseInt(this.total) + (parseInt(this.cartList[i].qty) * parseInt(this.cartList[i].salePrice))
                }
                var qty = 0;
                for(var i = 0; i < this.cartList.length; i++){
                  qty = qty + parseInt(this.cartList[i].qty);
                }
                this.globalService.setCartQty(qty.toString());
                this.globalService.setCartTotal(this.total);
              }else{
                this.valid.apiErrorResponse('only ' + response['qty'] + ' items available in stock');
                
                item.qty = response['qty'];
              }
            }, (error: any) => {
              console.log(error);
            });
          }
    }

  }
  
  removeCartItem(item: any){
    if(item.qty > 1){
      item.qty = parseInt(item.qty) - 1;
    }
    if(this.cartList.length > 0){
      this.total = parseInt(this.total) - parseInt(item.salePrice);

      if(item.qty == 1){
        this.found = false;
        this.index = 0;
        for(var i = 0; i < this.cartList.length; i++){
          if(this.cartList[i].productName == item.productName){
            this.found = true;
            this.index = i;
            i = this.cartList.length + 1;
          }
        }
        if(this.found == true){
          this.cartList.splice(this.index, 1);
        }
      }
    }
    
    this.total = 0;
    for(var i = 0; i < this.cartList.length; i++){
      this.total = parseInt(this.total) + (parseInt(this.cartList[i].qty) * parseInt(this.cartList[i].price))
    }

    if(this.cartList.length == 0){
      $('#cartModal').modal("hide");
    }

    var qty = 0;
    for(var i = 0; i < this.cartList.length; i++){
      qty = qty + parseInt(this.cartList[i].qty);
    }
    this.globalService.setCartQty(qty.toString());
    this.globalService.setCartTotal(this.total);
  }

  pushCartItem(item: any){
    this.dataService.getHttp('bachat-online-api/Product/getCheckQty?invoiceDetailID=' + item.invoiceDetailID + '&qty=' + item.qty, '').subscribe((response: any) => {

      if(response['msg'] == true){
        if(this.cartList.length == 0){
          this.cartList.push({
            applicationedoc: item.applicationedoc,
            invoiceDetailID: item.invoiceDetailID,
            invoiceNo: item.invoiceNo,
            productID: item.productID,
            productName: item.productName,
            salePrice: item.salePrice,
            qty: item.qty,
            availQty: item.availQty
          });
    
          this.total = parseInt(item.salePrice) * parseInt(item.qty);
            
          $('#cartModal').modal("show");
        }else{
          this.found = false;
          this.index = 0;
          
          for(var i = 0; i < this.cartList.length; i++){
            if(this.cartList[i].productName == item.productName){
              this.found = true;
              this.index = i;
              i = this.cartList.length + 1;
            }
          }
    
          if(this.found == true){
            if(parseInt(this.cartList[this.index].qty) < parseInt(item.qty)){
              this.cartList[this.index].qty = parseInt(this.cartList[this.index].qty) + (parseInt(this.cartList[this.index].qty) - parseInt(item.qty)); 
            }else if(parseInt(this.cartList[this.index].qty) < parseInt(item.qty)){
              this.cartList[this.index].qty = parseInt(this.cartList[this.index].qty) + (parseInt(item.qty) - parseInt(this.cartList[this.index].qty)); 
            }
          }else{
            this.cartList.push({
              applicationedoc: item.applicationedoc,
              invoiceDetailID: item.invoiceDetailID,
              invoiceNo: item.invoiceNo,
              productID: item.productID,
              productName: item.productName,
              salePrice: item.salePrice,
              qty: item.qty,
              availQty: item.availQty
            });
          }
    
          this.total = 0;
          for(var i = 0; i < this.cartList.length; i++){
            this.total = parseInt(this.total) + (parseInt(this.cartList[i].qty) * parseInt(this.cartList[i].salePrice))
          }
    
        }
        
        var qty = 0;
        for(var i = 0; i < this.cartList.length; i++){
          qty = qty + parseInt(this.cartList[i].qty);
        }
        this.globalService.setCartQty(qty.toString());
        this.globalService.setCartTotal(this.total);
    
      }else{
        this.valid.apiErrorResponse('only ' + response['qty'] + ' items available in stock');
        item.qty = response['qty'];
      }
      
    }, (error: any) => {
      console.log(error);
    });
    
  }

  checkout(){
    $("#cartModal").modal("hide");
    this.checkoutFound = true;
  }
}
