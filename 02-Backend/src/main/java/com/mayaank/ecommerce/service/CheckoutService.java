package com.mayaank.ecommerce.service;

import com.mayaank.ecommerce.dto.Purchase;
import com.mayaank.ecommerce.dto.PurchaseResponse;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);

}
