package com.twitter.config;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;

@Configuration
@EnableWebSecurity
public class AppConfig {


	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		return http
//				.csrf(csrf -> csrf.disable()) // Disable CSRF
				.csrf(AbstractHttpConfigurer::disable) // Disable CSRF
				.authorizeHttpRequests(auth -> auth
						.requestMatchers("/api/**").authenticated() // Require authentication for /api/** endpoints
						.anyRequest().permitAll() // Allow unauthenticated access to all other endpoints
				)
				.sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // Stateless session
				.addFilterBefore(new JwtTokenValidator(), BasicAuthenticationFilter.class) // Add JWT token validator filter
				.cors(cors -> cors.configurationSource(corsConfigurationSource())) // Enable CORS with custom config
				.httpBasic(Customizer.withDefaults()) // Enable HTTP Basic Authentication (if needed)
				.formLogin(Customizer.withDefaults()) // Enable form login (if needed)
				.build();
	}

//	@Bean
//	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//
//		http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//				.and()
//				.authorizeHttpRequests(Authorize -> Authorize.requestMatchers("/api/**").authenticated()
//						.anyRequest().permitAll()
//				).addFilterBefore(null, BasicAuthenticationFilter.class)
//				.csrf().disable()
//				.cors().configurationSource(corsConfigurationSource()).and()
//				.httpBasic().and().formLogin();
//
//		return http.build();
//	}

	private CorsConfigurationSource corsConfigurationSource() {
//		return request -> {
//			CorsConfiguration cfg = new CorsConfiguration();
//			cfg.setAllowedOrigins(List.of("http://localhost:3000")); // Set allowed origins
//			cfg.setAllowedMethods(Collections.singletonList("*")); // Set allowed methods (e.g., GET, POST)
//			cfg.setAllowCredentials(true); // Allow credentials (cookies, headers)
//			cfg.setAllowedHeaders(Collections.singletonList("*")); // Set allowed headers
//			cfg.setExposedHeaders(List.of("Authorization")); // Expose Authorization header
//			cfg.setMaxAge(3600L); // Max age for CORS requests (in seconds)
//			return cfg;
//		};

		return new CorsConfigurationSource() {
			@Override
			public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
				CorsConfiguration cfg = new CorsConfiguration();
				cfg.setAllowedOrigins(List.of("http://localhost:3000"));
				cfg.setAllowedMethods(Collections.singletonList("*"));
				cfg.setAllowCredentials(true);
				cfg.setAllowedHeaders(Collections.singletonList("*"));
				cfg.setExposedHeaders(List.of("Authorization"));
				cfg.setMaxAge(3600L);
				return cfg;
			}
		};
	}


	@Bean
	public PasswordEncoder passwordEncoder () {
		return new BCryptPasswordEncoder();
	}


}