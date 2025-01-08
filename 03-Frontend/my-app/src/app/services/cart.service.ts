import { Injectable } from '@angular/core';
import { CardItem } from '../common/card-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  

  cartItems: CardItem[] = [];
  
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();
  constructor() { }

  addToCart(theCartItem: CardItem){
    console.log(`Adding to cart: ${theCartItem.name}, ${theCartItem.unitPrice}`);
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CardItem = undefined;
    if(this.cartItems.length>0){

    for (let tempCartItem of this.cartItems) {
      if(tempCartItem.id === theCartItem.id){
        existingCartItem = tempCartItem;
        break;
      }
  }
}

  alreadyExistsInCart = (existingCartItem != undefined);
  if(alreadyExistsInCart){
    existingCartItem.quantity = existingCartItem.quantity + 1;
  }
  else{
    this.cartItems.push(theCartItem);
  }

  this.computeCartTotals();



  }
  computeCartTotals() {
    console.log('Computing cart totals');
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for(let currentCartItem of this.cartItems){
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    this.logCartData(totalPriceValue, totalQuantityValue);
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log('Contents of the cart');
    for (let tempCartItem of this.cartItems) {
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(`name: ${tempCartItem.name}, quantity=${tempCartItem.quantity}, unitPrice=${tempCartItem.unitPrice}, subTotalPrice=${subTotalPrice}`);
    }

    console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`);
    console.log('---');
}
decrementQuantity(theCartItem: any) {
    theCartItem.quantity--;
    if(theCartItem.quantity === 0){
      this.remove(theCartItem);
    }
    else{
      this.computeCartTotals();
    }
}
  remove(theCartItem: any) {
    const itemIndex = this.cartItems.findIndex(tempCartItem => tempCartItem.id === theCartItem.id);
    if(itemIndex > -1){
      this.cartItems.splice(itemIndex, 1);
      this.computeCartTotals();
    }
  }
}