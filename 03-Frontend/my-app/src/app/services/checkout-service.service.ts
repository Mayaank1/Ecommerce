import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Purchase } from '../common/purchase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutServiceService {

  private purchaseUrl = 'http://localhost:8080/api/checkout/purchase';



  constructor(private httpclient:HttpClient) 
  { }

  placeOrder(purchase:Purchase):Observable<any>{
    return this.httpclient.post(this.purchaseUrl,purchase);
  }
}
