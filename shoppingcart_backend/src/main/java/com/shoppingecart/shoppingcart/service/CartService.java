package com.shoppingecart.shoppingcart.service;


import com.shoppingecart.shoppingcart.model.Cart;

import java.util.List;

public interface CartService {

	public Cart saveCart(Integer productId, Integer userId);

	public List<Cart> getCartsByUser(Integer userId);
	
	public Integer getCountCart(Integer userId);

	public void updateQuantity(String sy, Integer cid);


//	public void removeCartByUser(Integer userID);

}
