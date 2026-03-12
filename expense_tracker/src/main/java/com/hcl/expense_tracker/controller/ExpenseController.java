package com.hcl.expense_tracker.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import com.hcl.expense_tracker.entity.Expense;
import com.hcl.expense_tracker.entity.User;
import com.hcl.expense_tracker.repository.ExpenseRepository;
import com.hcl.expense_tracker.repository.UserRepository;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/expenses")
@RequiredArgsConstructor
@CrossOrigin
public class ExpenseController {

    private final ExpenseRepository expenseRepository;
    private final UserRepository userRepository;

    // 🔹 Add Expense
    @PostMapping
    public Expense addExpense(@RequestBody Expense expense,
                              Principal principal) {

        User user = userRepository
                .findByUsername(principal.getName())
                .orElseThrow();

        expense.setUser(user);

        return expenseRepository.save(expense);
    }

    // 🔹 Get All Expenses (Only Logged-in User)
    @GetMapping
    public List<Expense> getAllExpenses(Principal principal) {

        User user = userRepository
                .findByUsername(principal.getName())
                .orElseThrow();

        return expenseRepository.findByUser(user);
    }

    // 🔹 Delete Expense (Only Own Expense)
    @DeleteMapping("/{id}")
    public String deleteExpense(@PathVariable Long id,
                                Principal principal) {

        User user = userRepository
                .findByUsername(principal.getName())
                .orElseThrow();

        Expense expense = expenseRepository
                .findByIdAndUser(id, user)
                .orElseThrow();

        expenseRepository.delete(expense);

        return "Expense Deleted Successfully";
    }

    // 🔹 Update Expense
    @PutMapping("/{id}")
    public Expense updateExpense(@PathVariable Long id,
                                 @RequestBody Expense updatedExpense,
                                 Principal principal) {

        User user = userRepository
                .findByUsername(principal.getName())
                .orElseThrow();

        Expense expense = expenseRepository
                .findByIdAndUser(id, user)
                .orElseThrow();

        expense.setTitle(updatedExpense.getTitle());
        expense.setAmount(updatedExpense.getAmount());
        expense.setCategory(updatedExpense.getCategory());
        expense.setDate(updatedExpense.getDate());
        expense.setDescription(updatedExpense.getDescription());

        return expenseRepository.save(expense);
    }
    
    @GetMapping("/monthly-total/{month}")
    public Double getMonthlyTotal(@PathVariable int month,
                                  Principal principal) {

        User user = userRepository
                .findByUsername(principal.getName())
                .orElseThrow();

        return expenseRepository.getMonthlyTotal(user.getId(), month);
        
    }
    
    
    
    @GetMapping("/report")
    public Double getMonthlyReport(
            @RequestParam int month,
            @RequestParam int year) {

        Double total = expenseRepository.getMonthlyExpense(month, year);

        return total == null ? 0 : total;
    }
}
