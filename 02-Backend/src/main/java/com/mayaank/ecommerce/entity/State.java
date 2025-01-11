package com.mayaank.ecommerce.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "State")
public class State {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    @Column(name = "name")
    private String name;
    @Column(name = "country")
    @JoinColumn(name = "country_id")
    private Country country;



}
