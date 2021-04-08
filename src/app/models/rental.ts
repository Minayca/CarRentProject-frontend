export interface Rental {
  id: number;
  carId: number;
  customerId: number;
  customerFirstName: string;
  customerLastName: string;
  rentDate: Date;
  returnDate: Date;
}
