package com.hcl.expense_tracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.hcl.expense_tracker.entity.Expense;
import com.hcl.expense_tracker.entity.User;

import java.util.List;
import java.util.Optional;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    List<Expense> findByUser(User user);
    Optional<Expense> findByIdAndUser(Long id, User user);
    
    @Query(value = "SELECT SUM(amount) FROM expense WHERE user_id = :userId AND EXTRACT(MONTH FROM date) = :month",
    	       nativeQuery = true)
    	Double getMonthlyTotal(@Param("userId") Long userId,
    	                       @Param("month") int month);
    
    @Query("SELECT SUM(e.amount) FROM Expense e WHERE MONTH(e.date)=:month AND YEAR(e.date)=:year")
    Double getMonthlyExpense(@Param("month") int month,
                             @Param("year") int year);
}
