package com.mayaank.ecommerce.service;

import com.mayaank.ecommerce.dao.CustomerRepository;
import com.mayaank.ecommerce.dto.PurchaseResponse;
import com.mayaank.ecommerce.dto.Purchase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CheckoutServiceImpl implements CheckoutService {
    private CustomerRepository customerRepository;
@Autowired
    public CheckoutServiceImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }
    @Override
    public PurchaseResponse placeOrder(Purchase purchase) {
        return null;
    }
}
