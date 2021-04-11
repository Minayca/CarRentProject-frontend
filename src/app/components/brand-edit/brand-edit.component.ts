import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-edit',
  templateUrl: './brand-edit.component.html',
  styleUrls: ['./brand-edit.component.css'],
})
export class BrandEditComponent implements OnInit {
  brandList: Brand[] = [];
  brandUpdateForm: FormGroup;
  selectedBrand: Brand;

  constructor(
    private brandService: BrandService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.listBrands();
  }

  listBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brandList = response.data;
    });
  }

  delete(brand: Brand) {
    this.brandService.delete(brand).subscribe((response) => {
      this.toastrService.success(response.message, 'Başarılı');
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    });
  }

  updateCreateForm() {
    this.brandUpdateForm = this.formBuilder.group({
      brandId: [this.selectedBrand.brandId, Validators.required],
      brandName: [this.selectedBrand.brandName, Validators.required],
    });
  }

  setSelectedBrandToUpdate(brand: Brand) {
    this.selectedBrand = brand;
    this.updateCreateForm();
  }

  updateBrand() {
    if (this.brandUpdateForm.valid) {
      let brandModel = Object.assign({}, this.brandUpdateForm.value);
      this.brandService.update(brandModel).subscribe(
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
        'Marka ismi boş olamaz',
        'Güncelleme Başarısız'
      );
    }
  }
}
