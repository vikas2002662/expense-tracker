package com.hcl.expense_tracker.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Expense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private Double amount;
    private String category;
    private LocalDate date;
    private String description;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
