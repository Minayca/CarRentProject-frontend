import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  savedCard: Card;
  amountOfPayment: number = 0;
  card: Card[];
  cardExist: Boolean = false;
  paymentSuccessfull: boolean;
  cardAddForm: FormGroup;
  isChecked: boolean = false;
  isCheckedCard: boolean = false;

  constructor(
    private cardService: CardService,
    private carService: CarService,
    private formBuilder: FormBuilder,
    private paymentService: PaymentService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService,
    private rentalService: RentalService
  ) {}

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getDetails(params['carId']);
      }
    });
    this.createCardAddForm();
    this.getCardByUserId();
  }

  paymentCalculator() {
    if (this.rental.returnDate != null) {
      var date1 = new Date(this.rental.returnDate.toString());
      var date2 = new Date(this.rental.rentDate.toString());
      var difference = date1.getTime() - date2.getTime();

      //zamanFark değişkeni ile elde edilen saati güne çevirmek için aşağıdaki yöntem kullanılabilir.
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

  createCardAddForm() {
    this.cardAddForm = this.formBuilder.group({
      userId: [Number(this.localStorageService.get('id')), Validators.required],
      cardOwnerName: ['', Validators.required],
      cardNumber: ['', Validators.required],
      expireMonth: ['', Validators.required],
      expireYear: ['', Validators.required],
      cvc: ['', Validators.required],
    });
  }

  payment() {
    this.paymentService.payment().subscribe(
      (response) => {
        this.add();
        this.paymentSuccessfull = response.success;
        this.toastrService.success(response.message);
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

  isCardExist() {
    if (this.savedCard != null) {
      this.cardExist = true;
    }
  }

  getCardByUserId() {
    this.cardService
      .getByUserId(Number(this.localStorageService.get('id')))
      .subscribe((response) => {
        this.savedCard = response.data[0];
        this.isCardExist();
      });
  }

  checkedCard() {
    this.isCheckedCard = true;
    this.getCardDetails();
  }

  getCardDetails() {
    if (this.isCheckedCard) {
      this.cardAddForm = this.formBuilder.group({
        userId: [
          Number(this.localStorageService.get('id')),
          Validators.required,
        ],
        cardOwnerName: this.savedCard.cardOwnerName,
        cardNumber: this.savedCard.cardNumber,
        expireMonth: this.savedCard.expireMonth,
        expireYear: this.savedCard.expireYear,
        cvc: this.savedCard.cvc,
      });
    }
  }

  add() {
    if (this.cardAddForm.valid && this.isChecked) {
      let cardModel = Object.assign({}, this.cardAddForm.value);
      if (this.savedCard.cardNumber != this.cardAddForm.value.cardNumber) {
        this.cardService.addCard(cardModel).subscribe(
          (response) => {
            this.toastrService.success(response.message, 'Başarılı');
          },
          (responseError) => {
            if (responseError.error.Errors.length > 0) {
              for (let i = 0; i < responseError.error.Errors.length; i++) {
                this.toastrService.error(
                  responseError.error.Errors[i].ErrorMessage,
                  'Doğrulama Hatası'
                );
              }
            }
          }
        );
      }
    } else {
      this.toastrService.error('Formunuz eksik!', 'Dikkat');
    }
  }
}
