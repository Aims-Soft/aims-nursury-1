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
    this.tableData[index].total = this.tableData[index].costPrice * item;

    this.eventEmitter.emit();
  }

  delete(index: any) {
    this.tableData.splice(index, 1);
  }
}
