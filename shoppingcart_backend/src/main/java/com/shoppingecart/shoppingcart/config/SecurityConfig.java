package com.shoppingecart.shoppingcart.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
public class SecurityConfig {


	@Autowired
	JWTauthenticationFilterclasss jwtAuthFilter;

	@Autowired
	private AuthenticationSuccessHandler authenticationSuccessHandler;
	
	@Autowired
	@Lazy
	private AuthFailureHandlerImpl authenticationFailureHandler;
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public UserDetailsService userDetailsService() {
		return new UserDetailsServiceImpl();
	}

	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
		configuration.setAllowedMethods(Arrays.asList("GET","POST","PUT", "DELETE","OPTION"));
//		configuration.addAllowedMethod(HttpMethod.POST);
		configuration.setAllowedHeaders(Arrays.asList("Authorization","*"));
//		configuration.addAllowedHeader("*");
		configuration.setAllowCredentials(true);
//		configuration.setExposedHeaders(Arrays.asList("*"));
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}



//	@Bean
//	public DaoAuthenticationProvider authenticationProvider() {
//		DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
//
//		authenticationProvider.setUserDetailsService(userDetailsService());
//		authenticationProvider.setPasswordEncoder(passwordEncoder());
//		return authenticationProvider;
//	}u


	@Bean
	public AuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
		provider.setUserDetailsService(userDetailsService());
		provider.setPasswordEncoder(passwordEncoder());
		return provider;
	}



	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception
	{
//		http
//				.cors(c -> c.configurationSource(corsConfigurationSource()))
//				.csrf(csrf->csrf.disable()).cors(cors->cors.disable())
//				.authorizeHttpRequests(req->req.requestMatchers("/user/**").hasRole("ROLE_USER")
//				.requestMatchers("/admin/**").hasRole("ROLE_ADMIN")
//				.requestMatchers("/**").permitAll())
//				.formLogin(form->form.loginPage("/signin")
//						.loginProcessingUrl("/login")
//						.defaultSuccessUrl("/")
//						.failureHandler(authenticationFailureHandler)
//						.successHandler(authenticationSuccessHandler))

				//NEW
//				.cors(httpSecurityCorsConfigurer -> httpSecurityCorsConfigurer.disable())
//				.csrf(httpSecurityCsrfConfigurer -> httpSecurityCsrfConfigurer.disable())
//				.authorizeHttpRequests(registry->registry
//						.requestMatchers("/admin/**").hasAuthority("ROLE_ADMIN")
//						.requestMatchers("/user/**").hasAuthority("ROLE_USER")
//						.requestMatchers("/log").permitAll()
//						.requestMatchers("/").permitAll())
//				.formLogin(form->form.disable())
//				.logout(logout->logout.permitAll());



				//JWTauthentication

		return http.csrf(httpSecurityCsrfConfigurer -> httpSecurityCsrfConfigurer.disable())
				//handle_errorand error response
				.authorizeHttpRequests(registry->
						registry
				.requestMatchers("/api/v1/login").permitAll()
								.requestMatchers("/home/**").permitAll()
								.requestMatchers("/admin/**").hasAuthority("ROLE_ADMIN")
//								.requestMatchers(HttpMethod.POST,"/user/**").hasAuthority("ROLE_USER")
								.requestMatchers("/user/**").hasAnyAuthority("ROLE_USER","ROLE_ADMIN")

								.anyRequest()
								.authenticated()
						)
				.cors(httpSecurityCorsConfigurer -> httpSecurityCorsConfigurer.disable())
				.cors(httpSecurityCorsConfigurer -> httpSecurityCorsConfigurer.configurationSource(corsConfigurationSource()))
				.sessionManagement(httpSecuritySessionManagementConfigurer ->
						httpSecuritySessionManagementConfigurer
								.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.authenticationProvider(authenticationProvider())
				.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class).build();



//		return http.build();
	}

}
