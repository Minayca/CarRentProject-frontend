import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandEditComponent } from './components/brand-edit/brand-edit.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarEditComponent } from './components/car-edit/car-edit.component';
import { CarComponent } from './components/car/car/car.component';
import { CarDetailComponent } from './components/carDetail/car-detail/car-detail.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorEditComponent } from './components/color-edit/color-edit.component';
import { PaymentComponent } from './components/payment/payment/payment.component';
import { RentalComponent } from './components/rental/rental/rental.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: CarComponent },
  { path: 'cars', component: CarComponent },
  { path: 'cars/edit', component: CarEditComponent },
  { path: 'cars/add', component: CarAddComponent },
  { path: 'cars/color/:colorId', component: CarComponent },
  { path: 'colors/edit', component: ColorEditComponent },
  { path: 'colors/add', component: ColorAddComponent },
  { path: 'colors/delete', component: ColorAddComponent },
  { path: 'cars/brand/:brandId', component: CarComponent },
  { path: 'brands/edit', component: BrandEditComponent },
  { path: 'brands/add', component: BrandAddComponent },
  { path: 'cars/brand/:brandId/color/:colorId', component: CarComponent },
  { path: 'cars/details/:carId', component: CarDetailComponent },
  { path: 'rentals/:carId', component: RentalComponent },
  { path: 'payment/:carId', component: PaymentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
