package com.shoppingecart.shoppingcart.Controllers;

import com.shoppingecart.shoppingcart.config.JWTserviceclass;
import com.shoppingecart.shoppingcart.model.Cart;
import com.shoppingecart.shoppingcart.model.OrderRequest;
import com.shoppingecart.shoppingcart.model.ProductOrder;
import com.shoppingecart.shoppingcart.model.UserDtls;
import com.shoppingecart.shoppingcart.service.OrderService;
import com.shoppingecart.shoppingcart.service.impl.CartServiceImpl;
import com.shoppingecart.shoppingcart.service.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

//@CrossOrigin(origins = "http://localhost:3000")

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserServiceImpl service;

    @Autowired
    private OrderService orderService;



    @Autowired
    private CartServiceImpl cartService;

    @Autowired
    JWTserviceclass jwtService;




    @GetMapping("/{email}")
    public UserDtls getUserByEmail(@PathVariable String email){
        UserDtls user = service.getUserByEmail(email);
        return user;
    }


    @PostMapping("/save-order")
    public String saveOrder(@ModelAttribute OrderRequest request, Principal p) throws Exception {
        // System.out.println(request);
        String username = p.getName();

        UserDtls user = service.getUserByEmail(username);
        orderService.saveOrder(user.getId(), request);
//        cartService.removeall
        return "Order Success";
    }


//    @GetMapping("/remove-cart")
//    public String removeCart(Principal p){
//        String username = p.getName();
//        UserDtls user = service.getUserByEmail(username);
//        int count=  cartService.getCountCart(user.getId());
//        if(count>0){
//            cartService.removeCartByUser(user.getId());
//            return "Cart Remove Successfully";
//        }
//        return "Cart not Found";
//    }






    @PutMapping("/update/{Id}")
    public String updateUser(@PathVariable Integer Id,@RequestBody UserDtls user){
        if (Id!=null) {

            UserDtls newUSer = new UserDtls();
            try{
                newUSer= service.getUserByID(Id).orElseThrow();

            }catch (Exception e){
                return "User Not Found !!";
            }

            newUSer.setName(user.getName());
            newUSer.setEmail(user.getEmail());
            newUSer.setAddress(user.getAddress());
            newUSer.setCity(user.getCity());
            newUSer.setProfileImage(user.getProfileImage());
            newUSer.setPassword(user.getPassword());
            newUSer.setMobileNumber(user.getMobileNumber());
            newUSer.setPincode(user.getPincode());
            newUSer.setState(user.getState());
            service.saveUser(newUSer);
            return "Updated !";
        }


        return "User Not Not !";
    }

    //cart

    @GetMapping("/add-cart/{productid}")
    public String addToCart(@PathVariable Integer productid, Principal p){
        String email = p.getName();
        UserDtls user = service.getUserByEmail(email);
        cartService.saveCart(productid, user.getId());

        return "Added to cart";
    }

    @GetMapping("/add/{id}")
    public String test(@PathVariable int id){
        return "Id is " +id;
    }

    @GetMapping("/view-cart")
    public List<Cart> viewUserCart(@RequestHeader String Authorization ){
        String email=  jwtService.extractUsername(Authorization.substring(7));
//       System.out.println(email);
        UserDtls user = service.getUserByEmail(email);
        return cartService.getCartsByUser(user.getId());

    }


    @GetMapping("/cart-count")
    public int getCartCount(Principal p){

        UserDtls user = getUserByEmail(p.getName());
        return cartService.getCountCart(user.getId());

    }

    @GetMapping("/cancel-order/{id}")
    public String cancelOrder(@PathVariable Integer id){

        orderService.cancelOrder(id);

        return "Successfully order Cancelled !!";
    }


    @GetMapping("/user-Order")
    public List<ProductOrder> getOrders(Principal p){

        UserDtls user = getUserByEmail(p.getName());
       return orderService.getOrdersByUser(user.getId());


    }

    @GetMapping("/principle")
    public String usrn(Principal p){
        return  p.getName();
    }



    @GetMapping("/profile")
    public UserDtls getProfileData(@RequestHeader String Authorization){
       String email=  jwtService.extractUsername(Authorization.substring(7));
//       System.out.println(email);
       UserDtls user = service.getUserByEmail(email);
       return user;
    }
    //for test
//    @GetMapping("/profile")
//    public String getProfileData(@RequestHeader String Authorization){
//
//        String Auth = Authorization.substring(7);
//        String email=  jwtService.extractUsername(Auth);
//        System.out.println(email);
//        return Auth;
//    }








}
