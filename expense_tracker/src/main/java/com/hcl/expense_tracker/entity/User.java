package com.hcl.expense_tracker.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")   // avoid reserved word conflict
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String username;

    private String password;
}
