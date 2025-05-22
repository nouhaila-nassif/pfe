package com.example.sales.config;

import com.example.sales.security.JwtAuthFilter;
import com.example.sales.security.UserDetailsServiceImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    private final UserDetailsServiceImpl userDetailsService;
    private final JwtAuthFilter jwtAuthFilter;

    public SecurityConfig(UserDetailsServiceImpl userDetailsService, JwtAuthFilter jwtAuthFilter) {
        this.userDetailsService = userDetailsService;
        this.jwtAuthFilter = jwtAuthFilter;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        // Endpoints d'authentification ouverts à tous
                        .requestMatchers("/api/auth/**", "/api/sellers").permitAll()

                        // Seul l'admin peut accéder à toutes ces ressources
                        .requestMatchers(
                                "/api/products/**",
                                "/api/clients/**",
                                "/api/routes/**",
                                "/api/promotions/**",
                                "/api/users/**",
                                "/api/dashboard/**",
                                "/api/exports/**"
                        ).hasRole("ADMIN")
// Pre-seller : accès restreint pour commandes, clients et routes assignés
                                .requestMatchers(
                                        "/api/orders/**",       // CRUD commandes
                                        "/api/routes/assigned/**",
                                        "/api/clients/assigned/**",
                                        "/api/revisits/**"
                                ).hasRole("PRE_SELLER")
                                // Direct Seller (chargement stock, vente temps réel, sync)
                                .requestMatchers(
                                        "/api/truck-stock/load/**",
                                        "/api/orders/real-time/**",
                                        "/api/sync/**"
                                ).hasRole("DIRECT_SELLER")

                                // Supervisor : gestion des vendeurs, approbations, contrôle tournées
                                .requestMatchers(
                                        "/api/sellers/performance/**",
                                        "/api/promotions/approve/**",
                                        "/api/orders/approve/**",
                                        "/api/routes/tour-control/**",
                                        "/api/revisits/**",
                                        "/api/routes/checkin/**"
                                ).hasRole("SUPERVISOR")

                                // Unit Manager
                                .requestMatchers(
                                        "/api/stock/allocations/validate/**",
                                        "/api/admin/requests/**"
                                ).hasRole("UNIT_MANAGER")

                        // Toute autre requête doit être authentifiée
                        .anyRequest().authenticated()
                )
                .authenticationProvider(authenticationProvider())
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
