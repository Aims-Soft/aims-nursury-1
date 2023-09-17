import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'aims-pos-product-purchase-table',
  templateUrl: './product-purchase-table.component.html',
  styleUrls: ['./product-purchase-table.component.scss'],
})
export class ProductPurchaseTableComponent implements OnInit {
  @Output() eventEmitter = new EventEmitter();

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
  // sale(index:any,item:any){
  //   this.tableData[index].total = this.tableData[index].qty * item;
  // }
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
}
