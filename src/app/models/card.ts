export interface Card {
  id: number;
  userId: number;
  cardOwnerName: string;
  cardNumber: string;
  expireMonth: number;
  expireYear: number;
  cvc: string;
}
