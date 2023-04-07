import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedServicesAuthModule } from '@aims-pos/shared/services/auth';
import { first } from 'rxjs/operators';
import { SharedHelpersFieldValidationsModule } from '@aims-pos/shared/helpers/field-validations';
import { SharedServicesDataModule } from '@aims-pos/shared/services/data';
import { environment } from 'apps/aims-pos/src/environments/environment';

@Component({
  selector: 'aims-pos-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  logoImg: any = '';
  loginForm: any;
  validate: any[] = [];
  hide = true;
  email = '';
  password = '';
  error = '';
  logoUrl: any = 'assets/ui/company/logo.png';

  constructor(
    private authService: SharedServicesAuthModule,
    private toastr: SharedHelpersFieldValidationsModule,
    private dataService: SharedServicesDataModule,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.getCompany();
  }

  // getCompany(){
  //   this.authService.getCompanyHttp('auth-api/logo', '').subscribe(
  //     (response: any) => {
  //       if (response.length > 0) {
  //         this.logoImg = environment.imageSavedPath + 'company/' +
  //                           response[0].companyShortName + '.png';
  //       }
  //     },
  //     (error: any) => {
  //       console.log(error);
  //     }
  //   );
  // }

  login() {
    this.validate = [
      {
        value: this.email,
        msg: 'enter user name or email',
        type: 'textBox',
        required: true,
      },
      {
        value: this.password,
        msg: 'enter password',
        type: 'textBox',
        required: true,
      },
    ];

    if (this.toastr.validateToastr(this.validate) == true) {
      this.authService
        .login(this.email, this.password)
        .pipe(first())
        .subscribe(
          (data) => {
            this.toastr.apiSuccessResponse('User Login Successfully');
            this.router.navigate(['home']);
          },
          (error) => {
            // console.log(error);
            // this.error = error.error.message;
            this.toastr.apiErrorResponse('user name or password in invalid');
          }
        );
    }
  }

  onChange(event: any) {
    if (event.keyCode == 13) {
      this.login();
    }
  }
}
