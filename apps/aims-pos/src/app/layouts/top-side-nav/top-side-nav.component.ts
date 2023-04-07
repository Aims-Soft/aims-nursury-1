import { Component, OnInit } from '@angular/core';
import { LoaderService, SharedServicesGlobalDataModule } from '@aims-pos/shared/services/global-data';

@Component({
  selector: 'aims-pos-top-side-nav',
  templateUrl: './top-side-nav.component.html',
  styleUrls: ['./top-side-nav.component.scss']
})
export class TopSideNavComponent implements OnInit {

  constructor(public loaderService: LoaderService, public globalDataService: SharedServicesGlobalDataModule) {
  }

  ngOnInit(): void {
  }

}
