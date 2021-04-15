import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { Card } from 'src/app/models/card';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { CardService } from 'src/app/services/card.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  rental: Rental;
  car: Car;
  amountOfPayment: number = 0;
  card: Card[];
  cardExist: Boolean = false;
  paymentSuccessfull!: boolean;
  cardAddForm: FormGroup;
  isChecked: boolean = false;

  constructor(
    private cardService: CardService,
    private carService: CarService,
    private paymentService: PaymentService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
    private rentalService: RentalService,
    private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getDetails(params['carId']);
      }
    });
    this.createCardForm();
  }

  createCardForm() {
    this.cardAddForm = this.formBuilder.group({
      userId: this.localStorageService.get('id'),
      cardOwnerName: ['', Validators.required],
      cardNumber: ['', Validators.required],
      expireMonth: ['', Validators.required],
      expireYear: ['', Validators.required],
      cvc: ['', Validators.required],
    });
    console.log(this.cardAddForm);
  }

  add() {
    if (this.cardAddForm.valid && this.isChecked) {
      console.log(this.isChecked);
      let cardModel = Object.assign({}, this.cardAddForm.value);
      this.cardService.addCard(cardModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
        },
        (responseError) => {
          if (responseError.error.Errors > 0) {
            for (let i = 0; i < responseError.error.Errors; i++) {
              this.toastrService.error(
                responseError.error.Errors[i].ErrorMessage,
                'Doğrulama Hatası'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.error('Formunuz eksik!', 'Dikkat');
    }
  }

  getDetails(carId: number) {
    this.carService.getCarsById(carId).subscribe((response) => {
      this.car = response.data[0];
    });
    this.rentalService.getRentalDetails(carId).subscribe((response) => {
      for (let i = 0; i < response.data.length; i++) {
        this.rental = response.data[i];
      }
      this.paymentCalculator();
    });
  }

  payment() {
    this.paymentService.payment().subscribe(
      (response) => {
        this.paymentSuccessfull = response.success;
        this.toastrService.success(response.message);
        this.add();
      },
      () => {
        this.paymentSuccessfull = false;
        this.rentalService.deleteRental(this.rental).subscribe((response) => {
          this.toastrService.error(response.message, 'Ödeme Başarısız.');
        });
      }
    );
    this.router.navigate(['/cars']);
  }

  paymentCalculator() {
    if (this.rental.returnDate != null) {
      var date1 = new Date(this.rental.returnDate.toString());
      var date2 = new Date(this.rental.rentDate.toString());
      var difference = date1.getTime() - date2.getTime();

      var numberOfDays = Math.ceil(difference / (1000 * 3600 * 24));
      this.amountOfPayment = numberOfDays * this.car.dailyPrice;
      if (this.amountOfPayment <= 0) {
        this.router.navigate(['/cars']);
        this.toastrService.error(
          'Araç listesine yönlendiriliyorsunuz',
          'Hatalı işlem'
        );
      }
    }
  }
}
