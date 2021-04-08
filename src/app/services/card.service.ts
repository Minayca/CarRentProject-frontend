import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../models/card';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  apiUrl = 'https://localhost:44357/api/';

  constructor(private httpClient: HttpClient) {}

  getByCustomerId(customerId: number) {
    let newPath =
      this.apiUrl + 'cards/getbycustomerid?customerId=1' + customerId;
    return this.httpClient.get<ListResponseModel<Card>>(newPath);
  }

  addCard(card: Card): Observable<ListResponseModel<Card>> {
    let newPath = this.apiUrl + 'cards/add';
    return this.httpClient.post<ListResponseModel<Card>>(newPath, card);
  }
}