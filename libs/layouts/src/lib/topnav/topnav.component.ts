import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedServicesAuthModule } from '@aims-pos/shared/services/auth';
import { SharedServicesGlobalDataModule } from '@aims-pos/shared/services/global-data';
import {
  ApplicationModuleInterface,
  UserInterface,
} from '@aims-pos/shared/interface';
import { SharedServicesDataModule } from '@aims-pos/shared/services/data';

@Component({
  selector: 'aims-pos-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss'],
})
export class TopnavComponent implements OnInit {
  @Output() public drawerToggle = new EventEmitter();

  applicationModulesList: ApplicationModuleInterface[] = [];

  menu_btn = 'menu';
  title = 'Point of Sale';
  userName = '';
  roleId = 0;
  currentUser!: UserInterface;
  logoUrl: any = '';

  constructor(
    private globalService: SharedServicesGlobalDataModule,
    private router: Router,
    private authService: SharedServicesAuthModule,
    private dataService: SharedServicesDataModule,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.globalService.header_title$.subscribe((str: string) => {
      this.title = str;
    });

    this.currentUser = this.authService.currentUserValue;
    this.userName = 'Hi, ' + this.currentUser.fullName;
    this.roleId = this.currentUser.roleId;

    this.getModuleData();
  }
  getModuleData() {
    // alert(this.roleId)
    // alert(this.globalService.getUserId())
    this.dataService
      .getHttp(
        'user-api/ApplicationModule/getUserModules?roleId=' +
          this.roleId +
          '&userId=' +
          this.globalService.getUserId(),
        ''
      )
      .subscribe((response: ApplicationModuleInterface[]) => {
        this.applicationModulesList = response;
        // this.router.navigate(['home']);
        if (!localStorage.getItem('moduleId')) {
          this.globalService.setMenuItems(response[0].applicationModuleId);

          localStorage.setItem('moduleId', response[0].applicationModuleId);
        }
      });
  }

  public onToggleDrawer = () => {
    this.drawerToggle.emit();

    if (this.menu_btn == 'menu') {
      this.menu_btn = 'menu_open';
    } else if (this.menu_btn == 'menu_open') {
      this.menu_btn = 'menu';
    }
  };

  setSidebarMenu(selectedModule: any) {
    localStorage.setItem('moduleId', selectedModule.applicationModuleId);

    this.globalService.setMenuItems(selectedModule.applicationModuleId);
    this.router.navigate(['home']);
  }

  async logout() {
    await this.authService.logout();
    this.router.navigate(['auth/login']);
  }
}
