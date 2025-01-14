import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { CartDetailsComponent } from '../cart-details/cart-details.component';
import { ShopFormService } from '../../services/shop-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup: FormGroup;
  totalQuantity: number = 0;
  totalPrice: number = 0.00;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  
  constructor(private formBuilder: FormBuilder,private shopForm : ShopFormService, private cartService : CartService) { }

  ngOnInit(): void {

    this.reviewCartDetails();
   
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('',[Validators.required,Validators.minLength(2)]),
        lastName: new FormControl('',[Validators.required,Validators.minLength(2)]),
        email: new FormControl('',[Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')])
      }),
      shippingAddress: this.formBuilder.group({
        address: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),
      billingAddress: this.formBuilder.group({
        address: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: ['']
      })
    });

    const startMonth: number = new Date().getMonth() + 1;
    console.log("Start month: " + startMonth);

    this.shopForm.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrieved credit card months: " + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    );

    this.shopForm.getCreditCardYears().subscribe(
      data => {
        console.log("Retrieved credit card years: " + JSON.stringify(data));
        this.creditCardYears = data;
      }
    );

    }
  reviewCartDetails() {
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );

    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );
  }
  
    get firstName() {
      return this.checkoutFormGroup.get('customer.firstName');
    }
    
    get lastName() {
      return this.checkoutFormGroup.get('customer.lastName');
    }
    
    get email() {
      return this.checkoutFormGroup.get('customer.email');
    }
    


onSubmit(){
  console.log(this.checkoutFormGroup.value);

  if(this.checkoutFormGroup.invalid){
    this.checkoutFormGroup.markAllAsTouched();
  }
  
}
copyShippingAddressToBillingAddress(event){
  if(event.target.checked){
    this.checkoutFormGroup.controls['billingAddress']
    .setValue(this.checkoutFormGroup.controls['shippingAddress'].value);
  }
  else{
    this.checkoutFormGroup.controls['billingAddress'].reset();
  }
}

handleMonthsandYears(){
  const creditCardExpirationMonth = this.checkoutFormGroup.get('creditCard.expirationMonth').value

  const currentYear: number = new Date().getFullYear();
  const selectedYear: number = Number(this.checkoutFormGroup.get('creditCard.expirationYear').value);

  let startMonth: number;

  if(currentYear === selectedYear){
    startMonth = new Date().getMonth() + 1;
  }
  else{
    startMonth = 1;
  }

  this.shopForm.getCreditCardMonths(startMonth).subscribe(
    data => {
      console.log("Retrieved credit card months: " + JSON.stringify(data));
      this.creditCardMonths = data;
    }
  );
}


}