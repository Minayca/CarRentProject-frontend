import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  apiUrl = 'https://localhost:44357/api/';

  constructor(private httpClient: HttpClient) {}

  getRentalDetails(carId: number) {
    let newPath = this.apiUrl + 'rentals/getrentaldetails?carId=' + carId;
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }

  addRental(rental: Rental): Observable<ListResponseModel<Rental>> {
    let newPath = this.apiUrl + 'rentals/add';
    return this.httpClient.post<ListResponseModel<Rental>>(newPath, rental);
  }

  deleteRental(rental: Rental): Observable<ListResponseModel<Rental>> {
    let newPath = this.apiUrl + 'rentals/delete';
    return this.httpClient.post<ListResponseModel<Rental>>(newPath, rental);
  }
}
