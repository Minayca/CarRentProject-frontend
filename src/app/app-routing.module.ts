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
import { LoginComponent } from './components/login/login.component';
import { PaymentComponent } from './components/payment/payment/payment.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { RentalComponent } from './components/rental/rental/rental.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: CarComponent },

  //Cars
  { path: 'cars', component: CarComponent },
  { path: 'cars/edit', component: CarEditComponent, canActivate: [LoginGuard] },
  { path: 'cars/add', component: CarAddComponent, canActivate: [LoginGuard] },
  { path: 'cars/brand/:brandId', component: CarComponent },
  { path: 'cars/color/:colorId', component: CarComponent },
  { path: 'cars/brand/:brandId/color/:colorId', component: CarComponent },
  { path: 'cars/details/:carId', component: CarDetailComponent },

  //Colors
  {
    path: 'colors/edit',
    component: ColorEditComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'colors/add',
    component: ColorAddComponent,
    canActivate: [LoginGuard],
  },

  //Brands
  {
    path: 'brands/edit',
    component: BrandEditComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'brands/add',
    component: BrandAddComponent,
    canActivate: [LoginGuard],
  },

  //Rental && Payment
  { path: 'rentals/:carId', component: RentalComponent },
  { path: 'payment/:carId', component: PaymentComponent },

  //Auth
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
