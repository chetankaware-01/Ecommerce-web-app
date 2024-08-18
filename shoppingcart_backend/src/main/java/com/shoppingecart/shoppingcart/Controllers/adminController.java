package com.shoppingecart.shoppingcart.Controllers;

import com.shoppingecart.shoppingcart.model.Category;
import com.shoppingecart.shoppingcart.model.Product;
import com.shoppingecart.shoppingcart.model.ProductOrder;
import com.shoppingecart.shoppingcart.model.UserDtls;
import com.shoppingecart.shoppingcart.service.impl.CategoryServiceImpl;
import com.shoppingecart.shoppingcart.service.impl.OrderServiceImpl;
import com.shoppingecart.shoppingcart.service.impl.ProductServiceImpl;
import com.shoppingecart.shoppingcart.service.impl.UserServiceImpl;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServlet;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.aspectj.lang.annotation.control.CodeGenerationHint;
import org.hibernate.engine.jdbc.WrappedBlob;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.server.Encoding;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import javax.swing.text.html.ImageView;
import javax.swing.text.html.parser.Entity;
import java.awt.*;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.*;
import java.util.List;

import static com.shoppingecart.shoppingcart.util.AppConstant.FOLDER_PATH;
//@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/admin")
public class adminController {
    @Autowired
    ProductServiceImpl service;
    @Autowired
    CategoryServiceImpl categoryService;
    @Autowired
    UserServiceImpl userService;

    @Autowired
    OrderServiceImpl orderService;


    @PostMapping("/add-product")
    public String addProduct(@ModelAttribute Product product , @RequestParam(name = "file",required = false) MultipartFile file) throws IOException {
        String imgPath="";
        if(file!=null){
            imgPath  = file.getOriginalFilename();
            try {
                File f = new File(imgPath);
                Files.copy(file.getInputStream(), Path.of(FOLDER_PATH+imgPath),StandardCopyOption.REPLACE_EXISTING);
            }catch (Exception E){
                System.out.println(E);
            }

        }
        else{
            imgPath = "default.jpg" ;
        }
        product.setImage(imgPath);
        service.saveProduct(product);


        return "added";
    }



    @PutMapping("/update-product")
    public String productUpdate(@ModelAttribute Product p, @RequestParam("file") MultipartFile image){
        service.updateProduct(p,image);
        return "Success";
    }


    @DeleteMapping("/delete-product/{Id}")
    public String dltProduct(@PathVariable Integer Id){
        service.deleteProduct(Id);
        return "Product Deleted !";

    }



    @PostMapping(value = "/add-category")
    public String addCategory(@ModelAttribute Category c,@RequestParam(value = "file", required = false) MultipartFile file) throws IOException {

//        System.out.println(c);
        String img = "default.jpg";


        if (categoryService.existCategory(c.getName())) {
            return "Category already Exist!!";
        }
            if (file != null) {

                img = file.getOriginalFilename();
                c.setImageName(file.getOriginalFilename());
                Path fileandpath = Paths.get(FOLDER_PATH+img);
                File saveFile = new File(FOLDER_PATH+img);
                Files.copy(file.getInputStream(), fileandpath, StandardCopyOption.REPLACE_EXISTING);
                categoryService.saveCategory(c);
                return "successfull";

            } else {
                c.setImageName("defult.jpg");
                categoryService.saveCategory(c);
                return "success";
            }




//        if (file != null) {
//
//            imageName = FOLDER_PATH + file.getOriginalFilename();
//            c.setImageName(imageName);
////            System.out.println(imageName);
//        }
//
//
//        if(file!=null){
//
//            c.setImageName(imageName);
//
//            Files.copy(file.getInputStream(),Path.of(FOLDER_PATH));
//            categoryService.saveCategory(c);
//        }
//        else{
//            c.setImageName(imageName);
//            categoryService.saveCategory(c);
//        }

    }


    @GetMapping("/all-orders")
    public List<ProductOrder> getOrdersList(){
        return orderService.getAllOrders();
    }




    //USer
    @GetMapping("/view-all")
    public List<UserDtls> Users() {
        return userService.getAll();
    }

//Category
//    @PostMapping("/add-category")
//    public String addCa(@RequestBody Category c){
//        if(categoryService.existCategory(c.getName())){
//            return  "Category Exist !!";
//        }
//        else {
//            categoryService.saveCategory(c);
//            return "Success";
//        }
//
//    }

    @GetMapping("/delete-category/{id}")
    public String deleteCategory(@PathVariable Integer Id){
        categoryService.deleteCategory(Id);
        return "Delete Successfully !!";
    }




    @PostMapping("/edit-category/{id}")
    public Category editCategory(@PathVariable int id, @ModelAttribute Category c, @RequestParam(value = "file", required = false) MultipartFile file) throws IOException {
        Category pre = categoryService.getCategoryById(id);
        pre.setImageName(c.getImageName());
        pre.setIsActive(c.getIsActive());
        if(file!=null){
            c.setImageName(file.getOriginalFilename());
            File img = new File(FOLDER_PATH+file.getOriginalFilename());
            Files.copy(file.getInputStream(), Path.of(FOLDER_PATH+file.getOriginalFilename()), StandardCopyOption.REPLACE_EXISTING);

        }
        return pre;
    }


    //Delete Category
    @DeleteMapping("/delete-catagory/{id}")
    public String deleteCategory(@PathVariable int id){

        Category d = categoryService.getCategoryById(id);
        if(d!=null){
            categoryService.deleteCategory(id);
            return "Category Successfully Deleted";
        }
        else{
            return "Category Not Found";
        }


    }












//    public ResponseEntity<Resource> getProfileImage (@PathVariable int id) throws IOException(
//
//    //Fetching the student object fron repository by id
//    Student student studentservice.getstudentById(id); Student object
//    // Here Get the image Path from the Path imagePath=Paths.get(uploadDirectory, student.getProfileImage()),
//    //Here we are fetching the image from that particular path Resource resource-new FileSystemResource (imagePath.toFile());
//        //Here getting the content type of iamge String contentType-Files.probeContent Type (imagePath),
//    return ResponseEntity.ok().contentType (MediaType.parseMediaType(contentType)).
//    body (resource)/


}
