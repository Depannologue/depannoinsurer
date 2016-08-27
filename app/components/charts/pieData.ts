export class PieData{
  profession: string;
  interventionsNumber: number;
  totalPrice: number;
  constructor(data){
    this.profession = data.profession;
    this.interventionsNumber = data.interventionsNumber;
    this.totalPrice = data.totalPrice;  
  }
}
