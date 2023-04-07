import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';

import { MaterialModule } from '@aims-pos/material';
import { FormsModule } from '@angular/forms';

import { TextMaskModule } from 'angular2-text-mask';

import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { MainPageComponent } from './main-page/main-page.component';
import { CheckoutComponent } from './main-page/checkout/checkout.component';
import { LayoutsModule } from '@aims-pos/layouts';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

export const bachatOnlineRoutes: Route[] = [
  { path: 'main', component: MainPageComponent },
];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    RouterModule.forChild(bachatOnlineRoutes),
    RouterModule,
    PerfectScrollbarModule,
    LayoutsModule,
    TextMaskModule
  ],
  declarations: [
    MainPageComponent,
    CheckoutComponent
  ],
  exports: [
    CheckoutComponent
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
  ],
})
export class BachatOnlineModule {}
