package com.shoppingecart.shoppingcart.config;

import com.shoppingecart.shoppingcart.model.UserDtls;
import com.shoppingecart.shoppingcart.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;


@Service
public class UserDetailsServiceImpl implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;
	private static final Logger logger = LoggerFactory.getLogger(UserDetailsServiceImpl.class);

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		logger.debug("Entering in loadUserByUsername Method...");
		UserDtls user = userRepository.findByEmail(username);
//		System.out.println(username.toString());
		if (user == null) {
			logger.error("Username not found: " + username);
			throw new UsernameNotFoundException("user not found");
		}
		logger.info("User Authenticated Successfully..!!!");
		return new CustomUser(user);
	}




//	@Override
//	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//		UserDtls user = userRepository.findByEmail(username);
//		if (user == null) {
//			throw new UsernameNotFoundException("User not found");
//		}
//		return new org.springframework.security.core.userdetails.User(
//				user.getEmail(),
//				user.getPassword(),
//				Collections.singletonList(new SimpleGrantedAuthority(user.getRole()))
//		);
//	}

}
