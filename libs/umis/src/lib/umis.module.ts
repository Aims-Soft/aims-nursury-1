import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';

import { UsersComponent } from './users/users.component';
import { RolesComponent } from './roles/roles.component';
import { UserTableComponent } from './users/user-table/user-table.component';
import { RoleCreationTableComponent } from './roles/role-creation-table/role-creation-table.component';

import { MaterialModule } from '@aims-pos/material';
import { FormsModule } from '@angular/forms';

import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

export const umisRoutes: Route[] = [
  { path: 'roles', component: RolesComponent },
  { path: 'users', component: UsersComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(umisRoutes),
    PerfectScrollbarModule,
    MaterialModule,
    FormsModule,
    Ng2SearchPipeModule,
  ],
  declarations: [
    UsersComponent,
    RolesComponent,
    UserTableComponent,
    RoleCreationTableComponent,
  ],
  exports: [RouterModule, UserTableComponent],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
  ],
})
export class UmisModule {}
