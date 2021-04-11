import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrandComponent } from './components/brand/brand/brand.component';
import { CarComponent } from './components/car/car/car.component';
import { CarImageComponent } from './components/carImage/car-image/car-image.component';
import { ColorComponent } from './components/color/color/color.component';
import { NaviComponent } from './components/navi/navi/navi.component';
import { RentalComponent } from './components/rental/rental/rental.component';
import { CustomerComponent } from './components/customer/customer/customer.component';
import { BrandFilterPipePipe } from './pipes/brand-filter-pipe.pipe';
import { ColorFilterPipePipe } from './pipes/color-filter-pipe.pipe';
import { CarFilterPipePipe } from './pipes/car-filter-pipe.pipe';
import { SidebarComponent } from './components/sidebar/sidebar/sidebar.component';
import { CarDetailComponent } from './components/carDetail/car-detail/car-detail.component';

import { ToastrModule } from 'ngx-toastr';
import { PaymentComponent } from './components/payment/payment/payment.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarEditComponent } from './components/car-edit/car-edit.component';
import { ColorEditComponent } from './components/color-edit/color-edit.component';
import { BrandEditComponent } from './components/brand-edit/brand-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    BrandComponent,
    CarComponent,
    CarImageComponent,
    ColorComponent,
    NaviComponent,
    RentalComponent,
    CustomerComponent,
    BrandFilterPipePipe,
    ColorFilterPipePipe,
    CarFilterPipePipe,
    SidebarComponent,
    CarDetailComponent,
    PaymentComponent,
    BrandAddComponent,
    ColorAddComponent,
    CarAddComponent,
    CarEditComponent,
    ColorEditComponent,
    BrandEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-left',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
