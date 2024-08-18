package com.shoppingecart.shoppingcart.Controllers;

import com.shoppingecart.shoppingcart.config.AuthRequestDTO;
import com.shoppingecart.shoppingcart.config.JWTserviceclass;
import com.shoppingecart.shoppingcart.config.JwtResponseDTO;
import com.shoppingecart.shoppingcart.model.UserDtls;
import com.shoppingecart.shoppingcart.service.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.net.http.HttpRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;


//@CrossOrigin(origins = "http://localhost:3000")
@RestController

public class home {

    @Autowired
    AuthenticationProvider authenticationProvider ;
    @Autowired
    JWTserviceclass JwtService;
    @Autowired
    UserServiceImpl userService;




    @PostMapping("/log")
    public String User(@RequestBody UserDtls user){
        UsernamePasswordAuthenticationToken d =
                UsernamePasswordAuthenticationToken.unauthenticated(user.getEmail(), user.getPassword());
        Authentication a = authenticationProvider.authenticate(d);

        return a.toString();
    }


    @PostMapping("/api/v1/login")
    public List<JwtResponseDTO> AuthenticateAndGetToken(@RequestBody AuthRequestDTO authRequestDTO){
        Authentication authentication = authenticationProvider.authenticate(new UsernamePasswordAuthenticationToken(authRequestDTO.getUsername(), authRequestDTO.getPassword()));
//        System.out.println(authentication.getPrincipal().toString());
        System.out.println(authentication);
        if(authentication.isAuthenticated()){
            UserDtls user = userService.getUserByEmail(authRequestDTO.getUsername());
            String Role = user.getRole();
//            System.out.println(Role);
            List<JwtResponseDTO> response = new ArrayList<>();
            if(Role.equals("ROLE_ADMIN")){
                response.add( JwtResponseDTO.builder()
                        .accessToken(JwtService.GenerateToken(authRequestDTO.getUsername())).build());
                response.add(JwtResponseDTO.builder().accessToken("ADMIN").build());
                return response;
            }else {
                 response.add(JwtResponseDTO.builder()
                        .accessToken(JwtService.GenerateToken(authRequestDTO.getUsername())).build());
                return response;
            }
        } else {
            throw new UsernameNotFoundException("invalid user request..!!");
        }
    }


    @GetMapping("/")
    public String Success(){
        return  "/login done";
    }





}
