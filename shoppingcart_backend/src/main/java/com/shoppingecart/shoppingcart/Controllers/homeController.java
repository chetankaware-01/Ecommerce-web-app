package com.shoppingecart.shoppingcart.Controllers;

import com.shoppingecart.shoppingcart.model.Category;
import com.shoppingecart.shoppingcart.model.Product;
import com.shoppingecart.shoppingcart.model.UserDtls;
import com.shoppingecart.shoppingcart.service.ProductService;
import com.shoppingecart.shoppingcart.service.impl.CategoryServiceImpl;
import com.shoppingecart.shoppingcart.service.impl.ProductServiceImpl;
import com.shoppingecart.shoppingcart.service.impl.UserServiceImpl;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

import static com.shoppingecart.shoppingcart.util.AppConstant.FOLDER_PATH;

//@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/home")
public class homeController {


    @Autowired
    private UserServiceImpl service;

    @Autowired
    ProductServiceImpl Pservice;

    @Autowired
    CategoryServiceImpl categoryService;



    @GetMapping("/signin")
    public String login(){
        return "Login page";
    }

    @GetMapping("/view-all-products")
    public List<Product> getAll() {
        return Pservice.getAllProducts();
    }

    @GetMapping("/products/{category}")
    public List<Product> getAllActive(@PathVariable String category) {
        return Pservice.getAllActiveProducts(category);
    }


//    @PostMapping("/add")
//    public String addUser(@RequestBody UserDtls user){
//        try{
//            UserDtls newUser = service.getUserByEmail(user.getEmail());
//            if(newUser==null){
//                service.saveUser(user);
//                return "Added !";
//            }
//            return "User Exist !! ";
//
//        }catch (Exception e){
//            return e.toString();
//        }
//    }


    @PostMapping("/saveUser")
    public String saveUser(@ModelAttribute UserDtls user, @RequestParam(value = "img", required = false) MultipartFile file, HttpSession session)
            throws IOException {
        String imageName = "default.jpg";
        if (file != null) {
            imageName = file == null ? "default.jpg" : file.getOriginalFilename();
        }
        try {
            UserDtls newUser = service.getUserByEmail(user.getEmail());
            if (newUser == null) {
                user.setProfileImage(imageName);

                UserDtls saveUser = service.saveUser(user);

                if(file != null) {
                    File saveFile = new File(FOLDER_PATH+imageName);
                    Files.copy(file.getInputStream(), Path.of(FOLDER_PATH+imageName), StandardCopyOption.REPLACE_EXISTING);

                }
                return "Added !";
            }
            else{
                return "User Exist !! ";
            }



        } catch (Exception e) {
            return e.toString();


//        if (!ObjectUtils.isEmpty(saveUser)) {
//            if (!file.isEmpty()) {
//                File saveFile = new ClassPathResource("resources/static").getFile();
//
//                Path path = Paths.get(saveFile.getAbsolutePath() + File.separator + "profile_img" + File.separator
//                        + file.getOriginalFilename());
//
////				System.out.println(path);
//                Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
//            }
//            if (file != null) {
//
//                session.setAttribute("succMsg", "Register successfully");
//            } else {
//                session.setAttribute("errorMsg", "something wrong on server");
//            }

//            return "Success";
        }

    }

    @GetMapping("/product/{id}")
    public Product getProductByID (@PathVariable Integer id){
        Product p = Pservice.getProductById(id);
        return p;
    }




    @GetMapping("/{img}")
    public ResponseEntity<?> downloadImageFromFileSystem(@PathVariable String img) throws IOException {
//        Optional<FileData> fileData = fileDataRepository.findByName(fileName);
//        String filePath=fileData.get().getFilePath();
//            String img = "C:/Users/HP/Downloads/shoppingcart/src/main/resources/static/img/domesile.jpeg";
//            Path p = Path.of(img,"" );
        byte[] images = new byte[0];
//            byte[] data = new byte[0];

//        String imD="";
//        StreamUtils.(images,)
//        MultipartFile file=null;
//        file.getBytes();
        try {
            images = Files.readAllBytes(new File(FOLDER_PATH+img).toPath());

//                imD = new String(Files.readAllBytes(new File(img).toPath()));
        } catch (IOException e) {
            e.printStackTrace();

        }

//            return  images;

//            String contenttype = Files.probeContentType(p);
//            MediaType.parseMediaType(contenttype);
//            return images;
//            File f = new File(img);
//            Image n = ImageIO.read(new ByteArrayInputStream(images));



//        URL url = new URL("urlPath");
//        BufferedImage c = ImageIO.read(url);
//        ImageIcon image = new ImageIcon(c);
//        jXImageView1.setImage(image);



        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf("image/png"))
                .body(images);
//            Base64.Encoder(images,String);
//        return  Ent


    }





    //category
    //    List<Category>
    @GetMapping("/view-categories")
    public List<Category> getCategory(){
        List<Category>  data= categoryService.getAllCategory();


        return data;

//         Map<Category,ResponseEntity> response = new HashMap<>();
////
//        byte[] images = new byte[0];
//
//         data.forEach(category -> {
//
//             try {
//                 response.put(category,downloadImageFromFileSystem(category.getImageName()));
//             } catch (IOException e) {
//                 e.printStackTrace();
//             }
//
//         });
//
//         return response;

//         img.forEach(i->{
//             try {
//               byte[] idata =  downloadImageFromFileSystem(i);
//               response.put(data.get(1),idata);
//             } catch (IOException e) {
//                 e.printStackTrace();
//             }
//         });


//         return response;



    }




}

