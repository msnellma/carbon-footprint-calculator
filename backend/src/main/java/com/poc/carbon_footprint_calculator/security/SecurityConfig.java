// package com.poc.carbon_footprint_calculator.security;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.web.SecurityFilterChain;

// @EnableWebSecurity
// @Configuration
// public class SecurityConfig {

//     @Bean
//     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//         // Disable CSRF protection
//         http
//         .authorizeHttpRequests((requests) -> requests.anyRequest().permitAll())
//         .csrf((csrf) -> csrf.disable());

//         return http.build();
//     }

// }
