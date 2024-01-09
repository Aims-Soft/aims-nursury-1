import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'aims-pos-product-purchase-table',
  templateUrl: './product-purchase-table.component.html',
  styleUrls: ['./product-purchase-table.component.scss'],
})
export class ProductPurchaseTableComponent implements OnInit {
  @Output() eventEmitter = new EventEmitter();

  lblTotalQty: any = 0;
  lblTotalCostPrice: any = 0;
  lblTotalSalePrice: any = 0;
  lblTotalDiscount: any = 0;
  lblTotal: any = 0;
  lblTotalAdtAmount: any = 0;
  lblTotalStAmount: any = 0;

  tableData: any = [];

  constructor() {}

  ngOnInit(): void {}

  totalBill(index: any, item: any) {
    this.tableData[index].adtAmount =
      (this.tableData[index].adtPer * this.tableData[index].costPrice * item) /
      100;

    this.tableData[index].stAmount =
      (this.tableData[index].stPer * this.tableData[index].costPrice * item) /
      100;

    this.tableData[index].total =
      this.tableData[index].costPrice * item +
      this.tableData[index].adtAmount +
      this.tableData[index].stAmount;

    this.eventEmitter.emit();
  }

  cost(index: any, item: any) {
    this.tableData[index].adtAmount =
      (this.tableData[index].adtPer * this.tableData[index].qty * item) / 100;

    this.tableData[index].stAmount =
      (this.tableData[index].stPer * this.tableData[index].qty * item) / 100;

    this.tableData[index].total =
      this.tableData[index].qty * item +
      this.tableData[index].adtAmount +
      this.tableData[index].stAmount;

    this.eventEmitter.emit();
  }

  discount(index: any, item: any) {
    this.tableData[index].costPrice = this.tableData[index].tempCostPrice;
    this.tableData[index].costPrice -= item;

    if (item == '') {
      this.tableData[index].discount = 0;
    }
    this.cost(index, this.tableData[index].costPrice);
  }

  delete(index: any) {
    this.tableData.splice(index, 1);
  }

  onADTChange(index: any, item: any) {
    this.tableData[index].adtAmount =
      (this.tableData[index].costPrice * this.tableData[index].qty * item) /
      100;
    this.tableData[index].total =
      this.tableData[index].qty * this.tableData[index].costPrice +
      this.tableData[index].adtAmount +
      this.tableData[index].stAmount;

    this.eventEmitter.emit();
  }

  onSTChange(index: any, item: any) {
    this.tableData[index].stAmount =
      (this.tableData[index].costPrice * this.tableData[index].qty * item) /
      100;
    this.tableData[index].total =
      this.tableData[index].qty * this.tableData[index].costPrice +
      this.tableData[index].stAmount +
      this.tableData[index].adtAmount;

    this.eventEmitter.emit();
  }

  calculateTotal() {
    this.lblTotal = 0;
    this.lblTotalCostPrice = 0;
    this.lblTotalSalePrice = 0;
    this.lblTotalQty = 0;
    this.lblTotalDiscount = 0;
    this.lblTotalAdtAmount = 0;
    this.lblTotalStAmount = 0;

    for (var i = 0; i < this.tableData.length; i++) {
      this.lblTotal += this.tableData[i].total;
      this.lblTotalCostPrice += this.tableData[i].costPrice;
      this.lblTotalSalePrice += this.tableData[i].salePrice;
      this.lblTotalDiscount += parseInt(this.tableData[i].discount);
      this.lblTotalQty += parseFloat(this.tableData[i].qty);
      this.lblTotalAdtAmount += this.tableData[i].adtAmount;
      this.lblTotalStAmount += this.tableData[i].stAmount;
    }
  }
}
