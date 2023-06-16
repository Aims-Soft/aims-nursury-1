import { SharedHelpersFieldValidationsModule } from '@aims-pos/shared/helpers/field-validations';
import { CategoryInterface, MyFormField } from '@aims-pos/shared/interface';
import { SharedServicesDataModule } from '@aims-pos/shared/services/data';
import { SharedServicesGlobalDataModule } from '@aims-pos/shared/services/global-data';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryTableComponent } from './category-table/category-table.component';

@Component({
  selector: 'aims-pos-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  @ViewChild(CategoryTableComponent) categoryTable: any;

  roleID: any = 0;

  pageFields: CategoryInterface = {
    categoryID: '0',
    userID: '',
    companyID: '',
    businessID: '',
    categoryName: '',
    moduleId: '',
    branchID: '',
  };

  formFields: MyFormField[] = [
    {
      value: this.pageFields.categoryID,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFields.userID,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFields.companyID,
      msg: 'select company',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFields.businessID,
      msg: 'select business',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFields.categoryName,
      msg: 'enter category name',
      type: 'name',
      required: true,
    },
    {
      value: this.pageFields.moduleId,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFields.branchID,
      msg: '',
      type: 'hidden',
      required: false,
    },
  ];

  companyList: any = [];
  businessList: any = [];

  error: any;

  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) {}

  ngOnInit(): void {
    this.formFields[1].value = this.globalService.getUserId().toString();
    this.formFields[5].value = localStorage.getItem('moduleId');
    this.formFields[6].value = this.globalService.getBranchID();
    this.roleID = this.globalService.getRoleId();
    this.getCompany();
  }

  getCompany() {
    this.dataService.getHttp('cmis-api/Company/getCompany', '').subscribe(
      (response: any) => {
        this.companyList = response;
        if (this.globalService.getRoleId() != 1) {
          this.getBusiness();
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getBusiness() {
    var companyID = 0;
    if (this.globalService.getRoleId() == 1) {
      companyID = this.formFields[2].value;
    } else {
      companyID = this.globalService.getCompanyID();
    }
    this.dataService
      .getHttp('cmis-api/Business/getBusiness?companyID=' + companyID, '')
      .subscribe(
        (response: any) => {
          this.businessList = response;
          if (this.globalService.getRoleId() != 1) {
            this.formFields[2].value = this.globalService.getCompanyID();
            this.formFields[3].value = this.globalService.getBusinessID();
          }
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  save() {
    this.dataService
      .savetHttp(
        this.pageFields,
        this.formFields,
        'core-api/Category/saveCategory'
      )
      .subscribe(
        (response: any) => {
          console.log(response);
          if (response.message == 'Success') {
            if (this.formFields[0].value == '0') {
              this.valid.apiInfoResponse('Record saved successfully');
            } else {
              this.valid.apiInfoResponse('Record updated successfully');
            }

            this.categoryTable.getCategory();
            this.reset();
          } else {
            this.valid.apiErrorResponse(response.message.toString());
          }
        },
        (error: any) => {
          this.error = error;
          this.valid.apiErrorResponse(this.error);
        }
      );
  }

  reset() {
    this.formFields = this.valid.resetFormFields(this.formFields);

    this.formFields[0].value = '0';
  }

  edit(item: any) {
    this.formFields[2].value = item.companyid;
    this.getBusiness();

    this.formFields[0].value = item.categoryID;
    this.formFields[3].value = item.businessid;
    this.formFields[4].value = item.categoryName;
  }

  getKeyPressed(e: any) {
    if (e.keyCode == 13) {
      this.save();
    }
  }

  delete(item: any) {
    this.reset();
  }
}
