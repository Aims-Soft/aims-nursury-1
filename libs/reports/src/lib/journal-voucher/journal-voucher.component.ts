import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'aims-pos-journal-voucher',
  templateUrl: './journal-voucher.component.html',
  styleUrls: ['./journal-voucher.component.scss']
})
export class JournalVoucherComponent implements OnInit {

  dtpCurrentDate: any = '';

  constructor() { }

  ngOnInit(): void {
    this.dtpCurrentDate = new Date();
  }

}
