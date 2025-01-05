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
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CardItem = undefined;
    if(this.cartItems.length>0){

    for (let tempCartItem of this.cartItems) {
      if(tempCartItem.id === theCartItem.id){
        existingCartItem = tempCartItem;
        break;
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
}
  computeCartTotals() {
    throw new Error('Method not implemented.');
  }

}
