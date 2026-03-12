package com.hcl.expense_tracker.controller;


import lombok.*;
import org.springframework.security.authentication.
        AuthenticationManager;
import org.springframework.security.authentication.
        UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.
        PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.hcl.expense_tracker.entity.User;
import com.hcl.expense_tracker.repository.UserRepository;
import com.hcl.expense_tracker.security.JwtUtil;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    @PostMapping("/register")
    public String register(@RequestBody User user) {

        user.setPassword(
                passwordEncoder.encode(user.getPassword()));

        userRepository.save(user);
        return "User Registered Successfully";
    }

    @PostMapping("/login")
    public String login(@RequestBody User user) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        user.getUsername(),
                        user.getPassword()
                )
        );

        return jwtUtil.generateToken(user.getUsername());
    }

}
