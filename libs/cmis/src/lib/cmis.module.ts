import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';

import { MaterialModule } from '@aims-pos/material';
import { FormsModule } from '@angular/forms';

import { TextMaskModule } from 'angular2-text-mask';

import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { CompanyComponent } from './company/company.component';
import { BusinessComponent } from './business/business.component';
import { BranchComponent } from './branch/branch.component';
import { CompanyTableComponent } from './company/company-table/company-table.component';
import { BusinessTableComponent } from './business/business-table/business-table.component';
import { BranchTableComponent } from './branch/branch-table/branch-table.component';
import { CompanyImageUploadingComponent } from './company/company-image-uploading/company-image-uploading.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

export const cmisRoutes: Route[] = [
  { path: 'company', component: CompanyComponent },
  { path: 'business', component: BusinessComponent },
  { path: 'branch', component: BranchComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(cmisRoutes),
    PerfectScrollbarModule,
    MaterialModule,
    FormsModule,
    Ng2SearchPipeModule,
    TextMaskModule,
  ],
  declarations: [
    CompanyComponent,
    BusinessComponent,
    BranchComponent,
    CompanyTableComponent,
    BusinessTableComponent,
    BranchTableComponent,
    CompanyImageUploadingComponent,
  ],
  exports: [
    CompanyTableComponent,
    BusinessTableComponent,
    BranchTableComponent,
    CompanyImageUploadingComponent,
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
  ],
})
export class CmisModule {}
