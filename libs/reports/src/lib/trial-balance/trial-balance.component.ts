import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'aims-pos-trial-balance',
  templateUrl: './trial-balance.component.html',
  styleUrls: ['./trial-balance.component.scss']
})
export class TrialBalanceComponent implements OnInit {

  dtpFromDate: any = "";
  dtpToDate: any = "";

  constructor() { }

  ngOnInit(): void {
    this.dtpFromDate = new Date();
    this.dtpToDate = new Date();
  }

}
