import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { Rental } from 'src/app/models/rental';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
})
export class RentalComponent implements OnInit {
  rentals: Rental[] = [];
  rentAddForm: FormGroup;
  carId: number;
  images: CarImage;
  cars: Car;
  rentDate: Date;
  returnDate: Date;
  finalPrice: number;
  today: Date;

  dataLoaded = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private rentalService: RentalService,
    private carService: CarService,
    private imageService: CarImageService,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.carId = parseInt(params['carId']);
        this.toastrService.info('Tarihleri Seçiniz');

        this.getDetails(params['carId']);
        this.checkRent(params['carId']);
        this.getRentalDetails(params['carId']);
        this.getImage(params['carId']);
        this.createRentAddForm();
        this.rentDate = new Date();
        this.returnDate = new Date();
      }
    });
  }

  checkRent(carId: number) {
    this.today = new Date();
    this.rentalService.getRentalDetails(carId).subscribe((response) => {
      this.rentals = response.data;
      for (let i = 0; i < this.rentals.length; i++) {
        this.rentDate = new Date(this.rentals[i].returnDate);
      }
      if (this.today.getTime() >= this.rentDate.getTime()) {
        this.rentDate = this.today;
      }
      this.returnDate = new Date(this.rentDate.getTime() + 1000 * 60 * 60 * 24);
      this.returnDate.setDate(this.rentDate.getDate() + 1);
      this.dataLoaded = true;
    });
  }

  getDetails(carId: number) {
    this.carService.getCarsById(carId).subscribe((response) => {
      this.cars = response.data[0];
    });
  }

  getRentSummary() {
    var date1 = new Date(this.rentAddForm.value.rentDate);
    var date2 = new Date(this.rentAddForm.value.returnDate);
    if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
      this.finalPrice = 0;
    } else if (date1 >= date2) {
      this.toastrService.error('Tarihleri kontrol ediniz.');
    } else {
      var difference = date2.getTime() - date1.getTime();
      var totalDate = Math.ceil(difference / (1000 * 3600 * 24));
      this.finalPrice = totalDate * this.cars.dailyPrice;
    }
  }

  goToPay(carId: number) {
    if (this.rentAddForm.valid) {
      let carModel = Object.assign({}, this.rentAddForm.value);
      this.rentalService.addRental(carModel).subscribe((response) => {
        this.toastrService.success(response.message, 'HARİKA');
      });
      setTimeout(() => {
        this.router.navigate(['/payment/', carId]);
      }, 2000);
      this.toastrService.info('Ödeme Sayfasına Yönlendiriliyor');
    } else {
      this.toastrService.error('Lütfen Tarihi Uygun Seçiniz');
    }
  }

  getImage(carId: number) {
    this.imageService.getImageByCarId(carId).subscribe((response) => {
      this.images = response.data[0];
    });
  }

  createRentAddForm() {
    this.rentAddForm = this.formBuilder.group({
      carId: [this.carId, Validators.required],
      customerId: [1, Validators.required],
      rentDate: ['', Validators.required],
      returnDate: ['', null],
    });
  }

  getRentalDetails(carId: number) {
    this.rentalService.getRentalDetails(carId).subscribe((response) => {
      this.rentals = response.data;
      this.dataLoaded = true;
    });
  }
}
