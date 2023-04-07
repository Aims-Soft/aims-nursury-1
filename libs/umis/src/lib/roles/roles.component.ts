import { SharedHelpersFieldValidationsModule } from '@aims-pos/shared/helpers/field-validations';
import { MyFormField, RoleInterface } from '@aims-pos/shared/interface';
import { SharedServicesDataModule } from '@aims-pos/shared/services/data';
import { SharedServicesGlobalDataModule } from '@aims-pos/shared/services/global-data';
import { Component, OnInit, ViewChild } from '@angular/core';
import { RoleCreationTableComponent } from './role-creation-table/role-creation-table.component';

declare var $: any;

@Component({
  selector: 'aims-pos-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements OnInit {
  @ViewChild(RoleCreationTableComponent) roleTable: any;

  roleID: any = 0;

  pageFields: RoleInterface = {
    roleID: '0', //0
    spType: '', //1
    userID: '', //2
    companyID: '', //3
    businessID: '', //4
    branchID: '', //5
    roleTitle: '', //6
    roleDescription: '', //7
    json: [], //8
  };
  formFields: MyFormField[] = [
    {
      value: this.pageFields.roleID,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFields.spType,
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
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFields.businessID,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFields.branchID,
      msg: 'select branch',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFields.roleTitle,
      msg: 'enter role title',
      type: 'name',
      required: true,
    },
    {
      value: this.pageFields.roleDescription,
      msg: 'enter role description',
      type: 'textBox',
      required: true,
    },
    {
      value: this.pageFields.json,
      msg: 'select module',
      type: 'textbox',
      required: true,
    },
  ];

  cmbModule: any = '';
  imgUrl: any = 'assets/ui/noImage.png';
  error: any;
  // read: boolean = true;
  // write: boolean = true;
  // delete: boolean = true;

  companyList: any = [];
  businessList: any = [];
  branchList: any = [];

  moduleList: any = [];
  menuList: any = [];
  tempMenuList: any = [];
  tempModuleList: any = [];
  selectedModuleList: any = [];
  menuOptList: any = [];

  constructor(
    private global: SharedServicesGlobalDataModule,
    private dataService: SharedServicesDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) {}

  ngOnInit(): void {
    this.global.setHeaderTitle('Roles Creation');
    this.formFields[2].value = this.global.getUserId().toString();

    this.roleID = this.global.getRoleId();
    this.getModules();
    this.getMenu();
    this.getRoleOption();

    this.getCompany();
  }

  getCompany() {
    this.dataService.getHttp('cmis-api/Company/getCompany', '').subscribe(
      (response: any) => {
        this.companyList = response;
        if (this.global.getRoleId() != 1) {
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
    if (this.global.getRoleId() == 1) {
      companyID = this.formFields[3].value;
    } else {
      companyID = this.global.getCompanyID();
    }
    this.dataService
      .getHttp('cmis-api/Business/getBusiness?companyID=' + companyID, '')
      .subscribe(
        (response: any) => {
          this.businessList = response;
          if (this.global.getRoleId() != 1) {
            this.formFields[3].value = this.global.getCompanyID();
            this.formFields[4].value = this.global.getBusinessID();
            this.formFields[5].value = '0';
          }
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  // getBranch() {
  //   var businessID = 0;
  //   if (this.global.getRoleId() == 1) {
  //     businessID = this.formFields[4].value;
  //   } else {
  //     businessID = this.global.getBusinessID();
  //     if (this.formFields[4].value == '') {
  //       this.formFields[4].value = this.global.getBusinessID();
  //     }
  //   }

  //   this.dataService
  //     .getHttp('cmis-api/Branch/getBranch?businessID=' + businessID, '')
  //     .subscribe(
  //       (response: any) => {
  //         this.branchList = response;
  //       },
  //       (error: any) => {
  //         console.log(error);
  //       }
  //     );
  // }

  getModules() {
    this.dataService.getHttp('user-api/Role/getApplicationMenu', '').subscribe(
      (response: any) => {
        this.moduleList = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getMenu() {
    this.dataService
      .getHttp('user-api/Role/getMenu?roleID=' + this.global.getRoleId(), '')
      .subscribe(
        (response: any) => {
          this.tempMenuList = response;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  setMenuData(item: any) {
    this.menuList = this.tempMenuList.filter(
      (m: { applicationModuleId: any }) => m.applicationModuleId == item
    );
  }

  addToSelectedModulesList(itemList: any, rwd: any, str: any) {
    var data = this.menuList.filter(
      (m: { menuId: any }) => m.menuId == itemList.menuId
    );

    var read, write, del;
    if (str == 'read' && rwd == true) {
      read = true;
      write = data[0].write;
      del = data[0].delete;
      data[0].read = true;
    } else if (str == 'read' && rwd == false) {
      read = false;
      write = data[0].write;
      del = data[0].delete;
      data[0].read = false;
    }
    if (str == 'write' && rwd == true) {
      write = true;
      read = data[0].read;
      del = data[0].delete;
      data[0].write = true;
    } else if (str == 'write' && rwd == false) {
      write = false;
      read = data[0].read;
      del = data[0].delete;
      data[0].write = false;
    }
    if (str == 'delete' && rwd == true) {
      del = true;
      read = data[0].read;
      write = data[0].write;
      data[0].delete = true;
    } else if (str == 'delete' && rwd == false) {
      del = false;
      read = data[0].read;
      write = data[0].write;
      data[0].delete = false;
    }

    if (
      this.tempModuleList.filter(
        (m: { applicationModuleId: any }) =>
          m.applicationModuleId == itemList.applicationModuleId
      ).length == 0
    ) {
      this.selectedModuleList = [];

      this.selectedModuleList.push({
        menuId: itemList.menuId,
        menuTitle: itemList.menuTitle,
        read: read,
        write: write,
        delete: del,
      });

      this.tempModuleList.push({
        applicationModuleId: itemList.applicationModuleId,
        applicationModuleTitle: itemList.applicationModuleTitle,
        tempMenuList: this.selectedModuleList,
      });
    } else {
      var index = this.tempModuleList.findIndex(
        (m: { applicationModuleId: any }) =>
          m.applicationModuleId == itemList.applicationModuleId
      );
      if (
        this.tempModuleList[index].tempMenuList.filter(
          (m: { menuId: any }) => m.menuId == itemList.menuId
        ).length == 0
      ) {
        this.tempModuleList[index].tempMenuList.push({
          applicationModuleId: itemList.applicationModuleId,
          applicationModuleTitle: itemList.applicationModuleTitle,
          menuId: itemList.menuId,
          menuTitle: itemList.menuTitle,
          read: read,
          write: write,
          delete: del,
        });
      } else {
        var childIndex = this.tempModuleList[index].tempMenuList.findIndex(
          (m: { menuId: any }) => m.menuId == itemList.menuId
        );

        this.tempModuleList[index].tempMenuList[childIndex].read = read;
        this.tempModuleList[index].tempMenuList[childIndex].write = write;
        this.tempModuleList[index].tempMenuList[childIndex].delete = del;

        if (
          this.tempModuleList[index].tempMenuList[childIndex].read == false &&
          this.tempModuleList[index].tempMenuList[childIndex].write == false &&
          this.tempModuleList[index].tempMenuList[childIndex].delete == false
        ) {
          this.tempModuleList[index].tempMenuList.splice(childIndex, 1);
        }
        if (this.tempModuleList[index].tempMenuList.length == 0) {
          this.tempModuleList.splice(index, 1);
        }
      }
    }
  }

  removeModule(index: any, item: any) {
    var data = this.menuList.filter(
      (m: { applicationModuleId: any }) =>
        m.applicationModuleId == item.applicationModuleId
    );
    for (var i = 0; i < data.length; i++) {
      data[i].read = false;
      data[i].write = false;
      data[i].delete = false;
    }
    this.tempModuleList.splice(index, 1);
  }

  getRoleOption() {
    this.dataService
      .getHttp('user-api/Role/getMenuRoleByModuleId', '')
      .subscribe(
        (response: any) => {
          this.menuOptList = response;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  getTotalRole(item: any) {
    this.dataService
      .getHttp('user-api/Role/getRoleDetail?roleID=' + item, '')
      .subscribe(
        (response: any) => {
          // console.log(response[0].json);
          this.tempMenuList = JSON.parse(response[0].json);
          $('#roleModal').modal('hide');
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  save() {
    var tempList: any = [];

    if (this.tempModuleList.length > 0) {
      for (var i = 0; i < this.tempModuleList.length; i++) {
        for (var j = 0; j < this.tempModuleList[i].tempMenuList.length; j++) {
          tempList.push({
            menuId: this.tempModuleList[i].tempMenuList[j].menuId,
            read: this.tempModuleList[i].tempMenuList[j].read,
            write: this.tempModuleList[i].tempMenuList[j].write,
            delete: this.tempModuleList[i].tempMenuList[j].delete,
          });
        }
      }
    }
    this.formFields[8].value = JSON.stringify(tempList);

    if (this.formFields[8].value == '[]') {
      this.valid.apiErrorResponse('select menu items');
      return;
    }
    if (this.formFields[0].value > 0) {
      this.dataService
        .savetHttp(this.pageFields, this.formFields, 'user-api/Role/updateRole')
        .subscribe(
          (response: any) => {
            console.log(response);
            if (response.message == 'Success') {
              this.valid.apiInfoResponse('Role updated successfully');
              this.roleTable.getRoles();
              this.getRoleOption();
              this.reset();
            } else {
              this.valid.apiErrorResponse(response.message);
            }
          },
          (error: any) => {
            this.error = error;
            this.valid.apiErrorResponse(this.error);
          }
        );
    } else {
      this.dataService
        .savetHttp(this.pageFields, this.formFields, 'user-api/Role/saveRole')
        .subscribe(
          (response: any) => {
            if (response.message == 'Success') {
              this.valid.apiInfoResponse('Role created successfully');
              this.roleTable.getRoles();
              this.getRoleOption();
              this.reset();
            } else {
              this.valid.apiErrorResponse(response.message);
            }
          },
          (error: any) => {
            this.error = error;
            this.valid.apiErrorResponse(this.error);
          }
        );
    }
  }

  reset() {
    // this.getApplicationMenu();
    this.getMenu();
    this.cmbModule = '';
    this.tempModuleList = [];
    this.selectedModuleList = [];
    this.menuList = [];
    this.formFields = this.valid.resetFormFields(this.formFields);
    this.formFields[0].value = '0';
    this.formFields[3].value = '';
    this.formFields[4].value = '';
    // this.formFields[5].value = '';
    this.getCompany();
    this.businessList = [];
    this.companyList = [];
  }

  edit(item: any) {
    this.cmbModule = '';
    this.tempModuleList = [];
    this.selectedModuleList = [];
    this.menuList = [];

    this.getTotalRole(this.global.getRoleId());

    this.getBusiness();

    this.formFields = this.valid.resetFormFields(this.formFields);

    this.formFields[3].value = item.companyID;
    this.formFields[4].value = item.busniessID;
    // this.formFields[5].value = item.branchID;
    this.formFields[6].value = item.roleTitle;
    this.formFields[7].value = item.roleDescription;
    this.formFields[0].value = item.roleId;

    // this.moduleList = this.tempMenuList.filter(
    //   (b: { roleId: any }) => b.roleId == item.roleId
    // );

    var tempList = this.menuOptList.filter(
      (a: { roleId: any }) => a.roleId == item.roleId
    );

    var found = false;
    // console.log(tempList);
    for (var i = 0; i < tempList.length; i++) {
      if (this.tempModuleList.length == 0) {
        for (var j = 0; j < tempList.length; j++) {
          if (
            tempList[i].applicationModuleId == tempList[j].applicationModuleId
          ) {
            this.selectedModuleList.push({
              menuId: tempList[j].menuId,
              menuTitle: tempList[j].menuTitle,
              read: tempList[j].read,
              write: tempList[j].write,
              delete: tempList[j].delete,
            });
          }
        }
        this.tempModuleList.push({
          applicationModuleId: tempList[i].applicationModuleId,
          applicationModuleTitle: tempList[i].applicationModuleTitle,
          tempMenuList: this.selectedModuleList,
        });
      } else {
        found = false;
        for (var j = 0; j < this.tempModuleList.length; j++) {
          if (
            tempList[i].applicationModuleId ==
            this.tempModuleList[j].applicationModuleId
          ) {
            found = true;
            j = this.tempModuleList.length + 1;
          }
        }
        if (found == false) {
          this.selectedModuleList = [];
          for (var j = 0; j < tempList.length; j++) {
            if (
              tempList[i].applicationModuleId == tempList[j].applicationModuleId
            ) {
              this.selectedModuleList.push({
                menuId: tempList[j].menuId,
                menuTitle: tempList[j].menuTitle,
                read: tempList[j].read,
                write: tempList[j].write,
                delete: tempList[j].delete,
              });
            }
          }
          this.tempModuleList.push({
            applicationModuleId: tempList[i].applicationModuleId,
            applicationModuleTitle: tempList[i].applicationModuleTitle,
            tempMenuList: this.selectedModuleList,
          });
        }
      }
    }
  }

  delete(item: any) {
    this.reset();
  }
}
