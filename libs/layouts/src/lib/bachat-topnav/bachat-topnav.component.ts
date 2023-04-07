import { SharedServicesGlobalDataModule } from '@aims-pos/shared/services/global-data';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
declare var $: any;

@Component({
  selector: 'aims-pos-bachat-topnav',
  templateUrl: './bachat-topnav.component.html',
  styleUrls: ['./bachat-topnav.component.scss']
})
export class BachatTopnavComponent implements OnInit {

  items: any;
  totalPrice: any = 0.00;

  // clickEventSubscription: Subscription;

  constructor(
    private globalService: SharedServicesGlobalDataModule,
  ) {}

  ngOnInit(): void {
    this.globalService.carQty$$.subscribe(value => this.items = value);
    this.globalService.cartTotal$$.subscribe(value => this.totalPrice = value);
  }

  openModal(){
    if(this.totalPrice > 0){
      $('#cartModal').modal("show");
    }
  }
}
