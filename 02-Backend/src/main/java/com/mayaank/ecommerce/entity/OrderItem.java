package com.mayaank.ecommerce.entity;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "order_item")
public class OrderItem {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
@Column(name = "image_url")
    private String imageUrl;
@Column(name = "quantity")
    private int quantity;
@Column(name = "unit_price")
    private BigDecimal unitPrice;
@Column(name = "product_id")
    private Long  productId;
@Column(name = "order_id")
    private Order order;


}
