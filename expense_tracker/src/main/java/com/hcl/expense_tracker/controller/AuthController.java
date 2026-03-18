package com.hcl.expense_tracker.controller;

import com.hcl.expense_tracker.entity.User;
import com.hcl.expense_tracker.repository.UserRepository;
import com.hcl.expense_tracker.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

        private final UserRepository userRepository;
        private final PasswordEncoder passwordEncoder;
        private final AuthenticationManager authenticationManager;
        private final JwtUtil jwtUtil;

        @PostMapping("/register")
        public String register(@RequestBody User user) {

                if (userRepository.findByUsername(user.getUsername()).isPresent()) {
                        return "Username already exists";
                }

                user.setPassword(passwordEncoder.encode(user.getPassword()));
                userRepository.save(user);

                return "User Registered Successfully";
        }

        @PostMapping("/login")
        public String login(@RequestBody User user) {

                authenticationManager.authenticate(
                                new UsernamePasswordAuthenticationToken(
                                                user.getUsername(),
                                                user.getPassword()));

                return jwtUtil.generateToken(user.getUsername());
        }
}