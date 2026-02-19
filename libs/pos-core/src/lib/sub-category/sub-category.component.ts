import { SharedHelpersFieldValidationsModule } from '@aims-pos/shared/helpers/field-validations';
import { MyFormField, SubCategoryInterface } from '@aims-pos/shared/interface';
import { SharedServicesDataModule } from '@aims-pos/shared/services/data';
import { SharedServicesGlobalDataModule } from '@aims-pos/shared/services/global-data';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SubCategoryTableComponent } from './sub-category-table/sub-category-table.component';

@Component({
  selector: 'aims-pos-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss'],
})
export class SubCategoryComponent implements OnInit {
  @ViewChild(SubCategoryTableComponent) subCategoryTable: any;

  roleID: any = 0;
  categorySearch: any;

  pageFields: SubCategoryInterface = {
    categoryID: '0', //0
    userID: '', //1
    companyID: '', //2
    businessID: '', //3
    parentCategoryID: '0', //4
    categoryName: '', //5
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
      required: false,
    },
    {
      value: this.pageFields.businessID,
      msg: 'select business',
      type: 'selectbox',
      required: false,
    },
    {
      value: this.pageFields.parentCategoryID,
      msg: 'select category',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFields.categoryName,
      msg: 'enter sub category name',
      type: 'name',
      required: true,
    },
    {
      value: this.pageFields.moduleId,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.branchID,
      msg: '',
      type: '',
      required: false,
    },
  ];

  companyList: any = [];
  businessList: any = [];
  categoryList: any = [];
  error: any;
  moduleId: string | null;
  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) {}

  ngOnInit(): void {
    this.moduleId = localStorage.getItem('moduleId');
    this.formFields[6].value = localStorage.getItem('moduleId');
    this.formFields[1].value = this.globalService.getUserId().toString();
    this.formFields[7].value = this.globalService.getBranchID();
    this.roleID = this.globalService.getRoleId();
    this.getCompany();
    this.getCategory();
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

  getCategory() {
    this.dataService
      .getHttp(
        'core-api/Category/getCategory?companyID=' +
          this.globalService.getCompanyID() +
          '&branchID=' +
          this.globalService.getBranchID() +
          '&userID=' +
          this.globalService.getUserId() +
          '&moduleId=' +
          this.moduleId,
        ''
      )
      .subscribe(
        (response: any) => {
          this.categoryList = response;
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
        'core-api/Category/saveSubCategory'
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

            this.subCategoryTable.getSubCategory();
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
    // console.log(item);return;
    this.formFields[0].value = item.categoryID;
    this.formFields[2].value = item.companyid;
    this.formFields[3].value = item.businessid;
    this.formFields[4].value = item.parentCategoryID;
    this.formFields[5].value = item.categoryName;
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
