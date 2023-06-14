// import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

// @Component({
//   selector: 'aims-pos-product-sale-table',
//   templateUrl: './product-sale-table.component.html',
//   styleUrls: ['./product-sale-table.component.scss'],
// })
// export class ProductSaleTableComponent implements OnInit {
//   @Output() eventEmitter = new EventEmitter();

//   tableData: any = [];
//   // cursorBlinking = false;
//   cursorBlinking = false;
//   constructor() {}

//   ngOnInit(): void {}
//   // toggleCursorBlink() {
//   //   this.cursorBlinking = !this.cursorBlinking;
//   // }
//   totalBill(index: any, qty: any, item: any) {
//     // alert(item.packing);
//     // alert(qty);
//     // if (qty < item.packing) {
//     //   this.tableData[index].total = Math.round(
//     //     (item.packingSalePrice / item.packing) * parseFloat(qty)
//     //   );
//     // } else {
//     this.tableData[index].total =
//       parseInt(this.tableData[index].salePrice) * parseFloat(qty);
//     // }
//     this.eventEmitter.emit();
//   }
//   // onKeyDown(event: KeyboardEvent) {
//   //   if (event.key === 'F9') {
//   //     event.preventDefault();
//   //     this.cursorBlinking = true;
//   //     this.startBlinkingCursor();
//   //   }
//   // }
//   // private startBlinkingCursor() {
//   //   const intervalId = setInterval(() => {
//   //     this.cursorBlinking = !this.cursorBlinking;
//   //   }, 500);

//   //   // Stop blinking after 5 seconds (optional)
//   //   setTimeout(() => {
//   //     clearInterval(intervalId);
//   //     this.cursorBlinking = false;
//   //   }, 5000);
//   // }
//   // onKeyDown(event: KeyboardEvent) {
//   //   if (event.key === 'F9') {
//   //     event.preventDefault();
//   //     const inputElement = document.getElementById(
//   //       'myInput'
//   //     ) as HTMLInputElement;
//   //     inputElement.focus();
//   //     this.toggleCursorBlink();
//   //   }
//   // }
//   delete(index: any) {
//     // this.tableData.splice(index, 1);
//     this.tableData[index].status = 'deleted';
//     this.eventEmitter.emit();
//   }
// }

import {
  Component,
  EventEmitter,
  ElementRef,
  HostListener,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'aims-pos-product-sale-table',
  templateUrl: './product-sale-table.component.html',
  styleUrls: ['./product-sale-table.component.scss'],
})
export class ProductSaleTableComponent implements OnInit {
  @ViewChild('myInput') myInput: ElementRef;
  @Output() eventEmitter = new EventEmitter();
  cursorBlinking = false;
  tableData: any = [];
  ngOnInit(): void {}

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'F9') {
      event.preventDefault();
      this.toggleCursorBlink();
      this.setFocusOnInput();
    }
  }

  toggleCursorBlink() {
    this.cursorBlinking = !this.cursorBlinking;
  }

  setFocusOnInput() {
    if (this.myInput && this.myInput.nativeElement) {
      this.myInput.nativeElement.focus();
    }
  }

  totalBill(index: any, qty: any, item: any) {
    this.tableData[index].total =
      parseInt(this.tableData[index].salePrice) * parseFloat(qty);
    this.eventEmitter.emit();
  }

  delete(index: any) {
    this.tableData[index].status = 'deleted';
    this.eventEmitter.emit();
  }
}
