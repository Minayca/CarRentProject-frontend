import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.css'],
})
export class CarEditComponent implements OnInit {
  carList: Car[] = [];
  carUpdateForm: FormGroup;
  selectedCar: Car;

  constructor(
    private carService: CarService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.listCars();
  }

  listCars() {
    this.carService.getCarList().subscribe((response) => {
      this.carList = response.data;
    });
  }

  delete(car: Car) {
    this.carService.delete(car).subscribe((response) => {
      this.toastrService.success(response.message, 'Başarılı');
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    });
  }

  updateCreateForm() {
    this.carUpdateForm = this.formBuilder.group({
      id: [this.selectedCar.id, Validators.required],
      brandId: [this.selectedCar.brandId, Validators.required],
      colorId: [this.selectedCar.colorId, Validators.required],
      dailyPrice: [this.selectedCar.dailyPrice, Validators.required],
      modelYear: [this.selectedCar.modelYear, Validators.required],
      description: [this.selectedCar.description],
    });
  }

  setSelectedCarToUpdate(car: Car) {
    this.selectedCar = car;
    this.updateCreateForm();
  }

  updateCar() {
    if (this.carUpdateForm.valid) {
      let carModel = Object.assign({}, this.carUpdateForm.value);
      this.carService.update(carModel).subscribe(
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
