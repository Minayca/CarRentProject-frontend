import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-edit',
  templateUrl: './color-edit.component.html',
  styleUrls: ['./color-edit.component.css'],
})
export class ColorEditComponent implements OnInit {
  colorList: Color[] = [];
  colorUpdateForm: FormGroup;
  selectedColor: Color;

  constructor(
    private colorService: ColorService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.listcolors();
  }

  listcolors() {
    this.colorService.getColors().subscribe((response) => {
      this.colorList = response.data;
    });
  }

  delete(color: Color) {
    this.colorService.delete(color).subscribe((response) => {
      this.toastrService.success(response.message, 'Başarılı');
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    });
  }

  updateCreateForm() {
    this.colorUpdateForm = this.formBuilder.group({
      colorId: [this.selectedColor.colorId, Validators.required],
      colorName: [this.selectedColor.colorName, Validators.required],
    });
  }

  setSelectedColorToUpdate(color: Color) {
    this.selectedColor = color;
    this.updateCreateForm();
  }

  updateColor() {
    if (this.colorUpdateForm.valid) {
      let colorModel = Object.assign({}, this.colorUpdateForm.value);
      this.colorService.update(colorModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        },
        (responseError) => {
          if (responseError.error.ValidationErrors > 0) {
            for (
              let i = 0;
              i < responseError.error.ValidationErrors.length;
              i++
            ) {
              this.toastrService.error(
                responseError.error.ValidationErrors[i].ErrorMessage,
                'Doğrulama Hatası'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.warning(
        'Renk ismi boş olamaz',
        'Güncelleme Başarısız'
      );
    }
  }
}
