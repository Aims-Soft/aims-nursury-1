import { LoaderService, SharedServicesGlobalDataModule } from '@aims-pos/shared/services/global-data';
import { Component } from '@angular/core';

@Component({
  selector: 'aims-pos-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'aims-pos';
  
  constructor(public loaderService: LoaderService, public globalDataService: SharedServicesGlobalDataModule) {
  }

}
