import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarComponent } from './components/car/car/car.component';
import { CarDetailComponent } from './components/carDetail/car-detail/car-detail.component';
import { PaymentComponent } from './components/payment/payment/payment.component';
import { RentalComponent } from './components/rental/rental/rental.component';

const routes: Routes = [
  {path : "",pathMatch : "full", component:CarComponent},
  {path : "cars", component:CarComponent},
  {path : "cars/color/:colorId", component:CarComponent},
  {path : "cars/brand/:brandId", component:CarComponent},
  {path : "cars/brand/:brandId/color/:colorId", component:CarComponent},
  {path : "cars/details/:carId", component:CarDetailComponent},
  {path : "rentals/:carId", component:RentalComponent},
  {path : "payment/:carId", component:PaymentComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
