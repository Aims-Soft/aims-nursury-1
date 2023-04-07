import { UserInterface } from '@aims-pos/shared/interface';
import { SharedServicesAuthModule } from '@aims-pos/shared/services/auth';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'aims-pos-print-sale',
  templateUrl: './print-sale.component.html',
  styleUrls: ['./print-sale.component.scss']
})
export class PrintSaleComponent implements OnInit {

  lblInvoice: any = '';
  lblDate: any = '';
  lblName: any = '';
  lblGTotal: any = 0;
  lblDiscount: any = 0;
  lblCash: any = 0;
  lblChange: any = 0;
  tableData: any = [];

  currentUser!: UserInterface;

  constructor(    
    private authService: SharedServicesAuthModule,
    ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.lblName = this.currentUser.fullName;
  }

}
