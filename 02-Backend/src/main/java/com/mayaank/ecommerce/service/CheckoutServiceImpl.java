package com.mayaank.ecommerce.service;

import com.mayaank.ecommerce.dao.CustomerRepository;
import com.mayaank.ecommerce.dto.PurchaseResponse;
import com.mayaank.ecommerce.dto.Purchase;
import com.mayaank.ecommerce.entity.Order;
import jakarta.transaction.Transactional;
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
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {
      Order order = purchase.getOrder();
        order.setOrderTrackingNumber(generateOrderTrackingNumber());
        order.setOrderItems(purchase.getOrderItems());
        order.setBillingAddress(purchase.getBillingAddress());
        order.setShippingAddress(purchase.getShippingAddress());
        order.setCustomer(purchase.getCustomer());

        customerRepository.save(purchase.getCustomer());

        return

    }

    private String generateOrderTrackingNumber() {



    }
}
