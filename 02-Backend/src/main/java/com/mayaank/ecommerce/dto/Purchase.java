package com.mayaank.ecommerce.dto;

import com.mayaank.ecommerce.entity.Address;
import com.mayaank.ecommerce.entity.Customer;
import com.mayaank.ecommerce.entity.Order;
import com.mayaank.ecommerce.entity.OrderItem;

import java.util.Set;

public class Purchase {
    private Address shippingAddress;
    private Address billingAddress;
    private Customer customer;
    private Order order;
    private Set<OrderItem> orderItems;

    public Address getShippingAddress() {
        return shippingAddress;
    }

    public void setShippingAddress(Address shippingAddress) {
        this.shippingAddress = shippingAddress;
    }

    public Address getBillingAddress() {
        return billingAddress;
    }

    public void setBillingAddress(Address billingAddress) {
        this.billingAddress = billingAddress;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public Set<OrderItem> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(Set<OrderItem> orderItems) {
        this.orderItems = orderItems;
    }
}
