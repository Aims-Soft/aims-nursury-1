import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedServicesAuthModule } from '@aims-pos/shared/services/auth';
import { SharedHelpersFieldValidationsModule } from '@aims-pos/shared/helpers/field-validations';
import { SharedHelpersJwtInterceptorModule } from '@aims-pos/shared/helpers/jwt-interceptor';
import { SharedServicesGlobalDataModule } from '@aims-pos/shared/services/global-data';
import { AuthGuard } from '@aims-pos/shared/helpers/guards';
import { HttpClientModule } from '@angular/common/http';

import { ChartModule } from 'angular-highcharts';

import { Route, RouterModule } from '@angular/router';
import { AuthModule, authRoutes } from '@aims-pos/auth';

import { MaterialModule } from '@aims-pos/material';
import { LayoutsModule } from '@aims-pos/layouts';

import { TopSideNavComponent } from './layouts/top-side-nav/top-side-nav.component';
import { HomeComponent } from '../../../../libs/auth/src/lib/home/home.component';
import { SharedServicesDataModule } from '@aims-pos/shared/services/data';

import { PosCoreModule } from '@aims-pos/pos-core';
import { ReportsModule } from '@aims-pos/reports';

import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { BachatTopSideNavComponent } from './layouts/bachat-top-side-nav/bachat-top-side-nav.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

export const appRoutes: Route[] = [
  { path: 'auth', children: authRoutes },
  {
    path: 'home',
    component: TopSideNavComponent,
    children: [{ path: '', component: HomeComponent }],
    canActivate: [AuthGuard],
  },
  {
    path: 'umis',
    component: TopSideNavComponent,
    loadChildren: () => import('@aims-pos/umis').then((m) => m.UmisModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'cmis',
    component: TopSideNavComponent,
    loadChildren: () => import('@aims-pos/cmis').then((m) => m.CmisModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'core',
    component: TopSideNavComponent,
    loadChildren: () =>
      import('@aims-pos/pos-core').then((m) => m.PosCoreModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'config',
    component: TopSideNavComponent,
    loadChildren: () =>
      import('@aims-pos/pos-core').then((m) => m.PosCoreModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'bachat',
    component: BachatTopSideNavComponent,
    loadChildren: () =>
      import('@aims-pos/bachat-online').then((m) => m.BachatOnlineModule),
  },
  {
    path: 'report',
    component: TopSideNavComponent,
    loadChildren: () =>
      import('@aims-pos/reports').then((m) => m.ReportsModule),
  },
  { path: '**', redirectTo: 'auth', pathMatch: 'full' },
];
@NgModule({
  declarations: [AppComponent, TopSideNavComponent, BachatTopSideNavComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    LayoutsModule,
    PosCoreModule,
    AuthModule,
    ReportsModule,
    SharedHelpersFieldValidationsModule,
    SharedServicesAuthModule,
    SharedHelpersJwtInterceptorModule,
    SharedHelpersFieldValidationsModule,
    SharedServicesGlobalDataModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabled' }),
    PerfectScrollbarModule,
    ChartModule,
  ],
  providers: [
    SharedServicesGlobalDataModule,
    SharedServicesDataModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SharedHelpersJwtInterceptorModule,
      multi: true,
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
