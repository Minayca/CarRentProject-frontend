export interface Card {
  id: number;
  customerId: number;
  cardOwnerName: string;
  cardNumber: string;
  expireMonth: number;
  expireYear: number;
  cvc: string;
}
