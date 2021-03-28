import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarComponent } from './components/car/car/car.component';
import { CarImageComponent } from './components/carImage/car-image/car-image.component';
import { CustomerComponent } from './components/customer/customer/customer.component';

const routes: Routes = [
  {path : "",pathMatch : "full", component:CarComponent},
  {path : "cars", component:CarComponent},
  {path : "cars/color/:colorId", component:CarComponent},
  {path : "cars/brand/:brandId", component:CarComponent},
  {path:"carimage/:carId", component:CarImageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
