package com.shoppingecart.shoppingcart.service;


import com.shoppingecart.shoppingcart.model.UserDtls;

import java.util.List;
import java.util.Optional;

public interface UserService {

	public UserDtls saveUser(UserDtls user);

	public UserDtls getUserByEmail(String email);

	public List<UserDtls> getUsers(String role);

	public Boolean updateAccountStatus(Integer id, Boolean status);

	public void increaseFailedAttempt(UserDtls user);

	public void userAccountLock(UserDtls user);

	public boolean unlockAccountTimeExpired(UserDtls user);

	public void resetAttempt(int userId);

	public void updateUserResetToken(String email, String resetToken);
	
	public UserDtls getUserByToken(String token);
	
	public UserDtls updateUser(UserDtls user);

	public Optional<UserDtls> getUserByID(Integer id);

}
