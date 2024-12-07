package com.twitter.controller;

import com.twitter.config.JwtProvider;
import com.twitter.exception.UserException;
import com.twitter.model.User;
import com.twitter.model.Verified;
import com.twitter.repository.UserRepository;
import com.twitter.response.AuthResponse;
import com.twitter.service.CustomUserDetailsImplementation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private CustomUserDetailsImplementation customUserDetailsImplementation;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> createUserHandler(@RequestBody User user) throws UserException {

        String email = user.getEmail();
        String password = user.getPassword();
        String fullName = user.getFullName();
        String birthDate = user.getBirthDate();

        User isEmailExist = userRepository.findByEmail(email);

        if (isEmailExist!=null) {
            throw new UserException("Email is already used another user");
        }

        User createdUser = new User();
        createdUser.setEmail(email);
        createdUser.setPassword(passwordEncoder.encode(password));
        createdUser.setFullName(fullName);
        createdUser.setBirthDate(birthDate);
        createdUser.setVerification(new Verified());

        User savedUser = userRepository.save(createdUser);

        Authentication authentication = new UsernamePasswordAuthenticationToken(email, password);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtProvider.generateToken(authentication);

        AuthResponse res = new AuthResponse(token, true);

        return new ResponseEntity<AuthResponse>(res, HttpStatus.CREATED);
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> signin(@RequestBody User user) {
        String username = user.getEmail();
        String password = user.getPassword();

        Authentication authentication = authenticate(username, password);

        String token = jwtProvider.generateToken(authentication);

        AuthResponse res = new AuthResponse(token, true);

        return new ResponseEntity<AuthResponse>(res, HttpStatus.ACCEPTED);
    }

    private Authentication authenticate(String username, String password) {

        UserDetails userDetails = customUserDetailsImplementation.loadUserByUsername(username);

        if(userDetails==null) {
            throw new BadCredentialsException("Invalid username");
        }

        if(!passwordEncoder.matches(password, userDetails.getPassword())){
            throw new BadCredentialsException("Invalid username or password");
        }

        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }

}