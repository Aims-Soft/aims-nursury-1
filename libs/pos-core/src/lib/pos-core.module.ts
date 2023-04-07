import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';

import { MaterialModule } from '@aims-pos/material';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { SearchPipe } from '@aims-pos/shared/interface';

import { TextMaskModule } from 'angular2-text-mask';

import { ProductComponent } from './product/product.component';
import { SaleComponent } from './sale/sale.component';
import { ProductTableComponent } from './product/product-table/product-table.component';
import { CategoryComponent } from './category/category.component';
import { BarcodeComponent } from './barcode/barcode.component';
import { PartyComponent } from './party/party.component';
import { RootComponent } from './root/root.component';
import { LocationComponent } from './location/location.component';
import { SizeComponent } from './size/size.component';
import { ColorComponent } from './color/color.component';
import { SchemeComponent } from './scheme/scheme.component';
import { CategoryTableComponent } from './category/category-table/category-table.component';
import { BarcodeTableComponent } from './barcode/barcode-table/barcode-table.component';
import { ColorTableComponent } from './color/color-table/color-table.component';
import { LocationTableComponent } from './location/location-table/location-table.component';
import { PartyTableComponent } from './party/party-table/party-table.component';
import { RootTableComponent } from './root/root-table/root-table.component';
import { SchemeTableComponent } from './scheme/scheme-table/scheme-table.component';
import { SizeTableComponent } from './size/size-table/size-table.component';
import { BrandComponent } from './brand/brand.component';
import { BrandTableComponent } from './brand/brand-table/brand-table.component';
import { ProductSaleTableComponent } from './sale/product-sale-table/product-sale-table.component';
import { PrintSaleComponent } from './sale/print-sale/print-sale.component';
import { OpeningBalanceComponent } from './opening-balance/opening-balance.component';
import { OpeningBalanceTableComponent } from './opening-balance/opening-balance-table/opening-balance-table.component';
import { BachatOnlineStockComponent } from './bachat-online-stock/bachat-online-stock.component';

import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { ChartModule } from 'angular-highcharts';

import { PurchaseComponent } from './purchase/purchase.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { SubCategoryTableComponent } from './sub-category/sub-category-table/sub-category-table.component';
import { ProductPurchaseTableComponent } from './purchase/product-purchase-table/product-purchase-table.component';
import { PrintPurchaseComponent } from './purchase/print-purchase/print-purchase.component';
import { CityComponent } from './city/city.component';
import { CityTableComponent } from './city/city-table/city-table.component';
import { ChartOfAccountComponent } from './chart-of-account/chart-of-account.component';
import { ChartOfAccountTableComponent } from './chart-of-account/chart-of-account-table/chart-of-account-table.component';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';
import { EmployeeProfileTableComponent } from './employee-profile/employee-profile-table/employee-profile-table.component';
import { BankComponent } from './bank/bank.component';
import { BankTableComponent } from './bank/bank-table/bank-table.component';
import { PaymentComponent } from './payment/payment.component';
import { PaymentTableComponent } from './payment/payment-table/payment-table.component';
import { DesignationComponent } from './designation/designation.component';
import { DesignationTableComponent } from './designation/designation-table/designation-table.component';
import { ProductImageUploadingComponent } from './product/product-image-uploading/product-image-uploading.component';
import { PosDashboardComponent } from './pos-dashboard/pos-dashboard.component';
import { UpdateProductDataComponent } from './update-product-data/update-product-data.component';
import { ProductImageUpdateComponent } from './product/product-image-update/product-image-update.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

export const posCoreRoutes: Route[] = [
  { path: 'product', component: ProductComponent },
  { path: 'sale', component: SaleComponent },
  { path: 'purchase', component: PurchaseComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'barcode', component: BarcodeComponent },
  { path: 'party', component: PartyComponent },
  { path: 'route', component: RootComponent },
  { path: 'location', component: LocationComponent },
  { path: 'size', component: SizeComponent },
  { path: 'color', component: ColorComponent },
  { path: 'scheme', component: SchemeComponent },
  { path: 'brand', component: BrandComponent },
  { path: 'obs', component: OpeningBalanceComponent },
  { path: 'order', component: BachatOnlineStockComponent },
  { path: 'subcategory', component: SubCategoryComponent },
  { path: 'city', component: CityComponent },
  { path: 'coa', component: ChartOfAccountComponent },
  { path: 'employee', component: EmployeeProfileComponent },
  { path: 'bank', component: BankComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'designation', component: DesignationComponent },
  { path: 'dashboard', component: PosDashboardComponent },
  { path: 'updtprod', component: UpdateProductDataComponent },

];

@NgModule({
  imports: [
    CommonModule, 
    RouterModule.forChild(posCoreRoutes),
    MaterialModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgxMatSelectSearchModule,
    PerfectScrollbarModule,
    TextMaskModule,
    ChartModule,
  ],
  exports:[
    RouterModule,
    ProductTableComponent,
    CategoryTableComponent,
    BarcodeTableComponent,
    ColorTableComponent,
    LocationTableComponent,
    PartyTableComponent,
    RootTableComponent,
    SchemeTableComponent,
    BrandTableComponent,
    SizeTableComponent,
    ProductSaleTableComponent,
    PrintSaleComponent,
    SubCategoryTableComponent,
    ProductPurchaseTableComponent,
    PrintPurchaseComponent,
    CityTableComponent,
    ChartOfAccountTableComponent,
    EmployeeProfileTableComponent,
    DesignationTableComponent,
    ProductImageUploadingComponent,
  ],
  declarations: [
    ProductComponent,
    SaleComponent,
    ProductTableComponent,
    CategoryComponent,
    BarcodeComponent,
    PartyComponent,
    RootComponent,
    LocationComponent,
    SizeComponent,
    ColorComponent,
    SchemeComponent,
    CategoryTableComponent,
    BarcodeTableComponent,
    ColorTableComponent,
    LocationTableComponent,
    PartyTableComponent,
    RootTableComponent,
    SchemeTableComponent,
    SizeTableComponent,
    BrandComponent,
    BrandTableComponent,
    ProductSaleTableComponent,
    SearchPipe,
    PrintSaleComponent,
    OpeningBalanceComponent,
    OpeningBalanceTableComponent,
    BachatOnlineStockComponent,
    PurchaseComponent,
    SubCategoryComponent,
    SubCategoryTableComponent,
    ProductPurchaseTableComponent,
    PrintPurchaseComponent,
    CityComponent,
    CityTableComponent,
    ChartOfAccountComponent,
    ChartOfAccountTableComponent,
    EmployeeProfileComponent,
    EmployeeProfileTableComponent,
    BankComponent,
    BankTableComponent,
    PaymentComponent,
    PaymentTableComponent,
    DesignationComponent,
    DesignationTableComponent,
    ProductImageUploadingComponent,
    PosDashboardComponent,
    UpdateProductDataComponent,
    ProductImageUpdateComponent,
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
  ],
})
export class PosCoreModule {}
