package com.hcl.expense_tracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hcl.expense_tracker.entity.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}
