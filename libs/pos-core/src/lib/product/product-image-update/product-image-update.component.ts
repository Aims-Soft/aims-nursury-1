import { SharedHelpersFieldValidationsModule } from '@aims-pos/shared/helpers/field-validations';
import { MyFormField } from '@aims-pos/shared/interface';
import { SharedServicesDataModule } from '@aims-pos/shared/services/data';
import { SharedServicesGlobalDataModule } from '@aims-pos/shared/services/global-data';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { environment } from 'apps/aims-pos/src/environments/environment';

@Component({
  selector: 'aims-pos-product-image-update',
  templateUrl: './product-image-update.component.html',
  styleUrls: ['./product-image-update.component.scss'],
})
export class ProductImageUpdateComponent implements OnInit {
  cmbCategory: any = '';

  searchCategory: any = '';
  tblSearch: any = '';

  categoryList: any = [];
  tableData: any = [];

  error: any;

  imgPath: any = 'C:/inetpub/wwwroot/FAR/FAR_Project/assets/assetEntryImg';
  imageUrl: string = '../../../../../assets/assetEntryImg/dropHereImg.png';
  image: any = '';
  selectedFile: File = null;
  imgExtension: any = '';
  moduleId: string | null;
  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule,
    private datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.getCategory();
    this.moduleId = localStorage.getItem('moduleId');
  }

  getCategory() {
    this.dataService
      .getHttp(
        'core-api/Category/getSubCategory?catID=1' +
          '&userID=' +
          this.globalService.getUserId() +
          '&moduleId=' +
          this.moduleId +
          '&branchID=' +
          this.globalService.getBranchID(),
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

  onCategoryChange(item: any) {
    this.tblSearch = '';

    this.tableData = [];

    this.dataService
      .getHttp(
        'core-api/Product/getProductByCategory?categoryID=' +
          item +
          '&userID=' +
          this.globalService.getUserId() +
          '&moduleId=' +
          this.moduleId +
          '&branchID=' +
          this.globalService.getBranchID(),
        ''
      )
      .subscribe(
        (response: any) => {
          // this.tableData = response;

          for (var i = 0; i < response.length; i++) {
            var imgUrl = '';
            if (response[i].applicationedoc != null) {
              imgUrl =
                'assets/ui/productPictures/' + response[i].productID + '.png';
            } else {
              imgUrl = 'assets/ui/productPictures/noImage.png';
            }

            this.tableData.push({
              productID: response[i].productID,
              productName: response[i].productName,
              imgFile: '',
              imageUrl: imgUrl,
            });
          }
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  onFileSelected(event: any, item: any) {
    if (event.target.files[0].type == 'image/png') {
      var fileName: any;
      this.selectedFile = event.target.files[0];
      fileName = this.selectedFile['name'];

      let reader = new FileReader();

      this.imgExtension = event.target.files[0].name.split('.').pop();

      reader.onloadend = (e: any) => {
        item.imageUrl = e.target.result;
        this.image = reader.result;
        var splitImg = this.image.split(',')[1];

        this.image = splitImg;
        item.imageUrl = e.target.result;
      };

      reader.readAsDataURL(this.selectedFile);
    } else {
      this.valid.apiErrorResponse('Please select PNG image');

      this.image = undefined;
      item = undefined;
      this.selectedFile = null;
      item.imageUrl = 'assets/ui/productPictures/noImage.png';
    }
  }

  save(item: any) {
    if (item.imgFile == '') {
      this.valid.apiInfoResponse('Please select image');
      return;
    } else {
      var pageFields = {
        productID: '0',
        userID: '',
        applicationEDoc: '',
        applicationEDocPath: '',
        applicationEdocExtenstion: '',
      };

      var formFields: MyFormField[] = [
        {
          value: pageFields.productID,
          msg: '',
          type: 'hidden',
          required: false,
        },
        {
          value: pageFields.userID,
          msg: '',
          type: 'hidden',
          required: false,
        },
        {
          value: pageFields.applicationEDoc,
          msg: '',
          type: 'hidden',
          required: false,
        },
        {
          value: pageFields.applicationEDocPath,
          msg: '',
          type: 'hidden',
          required: false,
        },
        {
          value: pageFields.applicationEdocExtenstion,
          msg: '',
          type: 'hidden',
          required: false,
        },
      ];

      formFields[0].value = item.productID;
      formFields[1].value = this.globalService.getUserId().toString();
      formFields[2].value = this.image;
      formFields[3].value = environment.imageUrl + 'productPictures';
      formFields[4].value = this.imgExtension;

      this.dataService
        .savetHttp(
          pageFields,
          formFields,
          'core-api/Product/updateProductImage?userID=' +
            this.globalService.getUserId() +
            '&moduleId=' +
            this.moduleId
        )
        .subscribe(
          (response: any) => {
            if (response.message == 'Success') {
              this.valid.apiInfoResponse('Record saved successfully');

              this.onCategoryChange(this.cmbCategory);
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
  }

  reset() {}
}
