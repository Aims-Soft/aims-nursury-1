import { SharedHelpersFieldValidationsModule } from '@aims-pos/shared/helpers/field-validations';
import { Component, Input, OnInit } from '@angular/core';

import * as $ from 'jquery';

@Component({
  selector: 'aims-pos-company-image-uploading',
  templateUrl: './company-image-uploading.component.html',
  styleUrls: ['./company-image-uploading.component.scss'],
})
export class CompanyImageUploadingComponent implements OnInit {
  image: any;
  imageExt: any;

  @Input() imageUrl: any;

  constructor(private valid: SharedHelpersFieldValidationsModule) {}

  ngOnInit(): void {}

  uploadFile(event: any) {
    if (event.target.files[0].type == 'image/png') {
      this.imageExt = 'png';
      let reader = new FileReader(); // HTML5 FileReader API
      let file = event.target.files[0];
      reader.onloadend = (e: any) => {
        this.image = reader.result;

        var splitImg = this.image.split(',')[1];
        this.image = splitImg;
      };

      if (event.target.files && event.target.files[0]) {
        reader.readAsDataURL(file);

        // When file uploads set it to file formcontrol
        reader.onload = () => {
          $('#imagePreview').css(
            'background-image',
            'url(' + reader.result + ')'
          );
          $('#imagePreview').hide();
          $('#imagePreview').fadeIn(650);
        };
      }
    } else {
      this.valid.apiErrorResponse('Only Png Image Allowed');
    }
  }
}
