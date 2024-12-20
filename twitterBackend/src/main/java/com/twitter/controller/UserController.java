package com.twitter.controller;

import com.twitter.dto.UserDto;
import com.twitter.dto.mapper.UserDtoMapper;
import com.twitter.exception.UserException;
import com.twitter.model.User;
import com.twitter.service.UserService;
import com.twitter.util.UserUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping("api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<UserDto> getUserProfile (@RequestHeader("Authorization") String jwt)
            throws UserException {

        User user = userService.findUserProfileByJwt(jwt);
        UserDto userDto = UserDtoMapper.toUserDto(user);

        userDto.setReq_user(true);


        return new ResponseEntity<UserDto>(userDto, HttpStatus.OK);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserDto> getUserById (@PathVariable Long userId,
                                                @RequestHeader("Authorization") String jwt)
            throws UserException {

        User reqUser = userService.findUserProfileByJwt(jwt);
        User user = userService.findUserById(userId);

        UserDto userDto = UserDtoMapper.toUserDto(user);

        userDto.setReq_user(UserUtil.isReqUser(reqUser, user));
        userDto.setFollowed(UserUtil.isFollowedByReqUser(reqUser, user));
        return new ResponseEntity<UserDto>(userDto, HttpStatus.ACCEPTED);
    }

    @GetMapping("/search")
    public ResponseEntity<List<UserDto>> searchUser (@RequestParam String query,
                                               @RequestHeader("Authorization") String jwt)
            throws UserException {

        User reqUser = userService.findUserProfileByJwt(jwt);
        List<User> users = userService.searchUser(query);

        List<UserDto> userDtos = UserDtoMapper.toUserDtos(users);

        return new ResponseEntity<>(userDtos, HttpStatus.ACCEPTED);
    }

    @PutMapping("/update")
    public ResponseEntity<UserDto> updateUser (@RequestBody User req ,
                                                     @RequestHeader("Authorization") String jwt)
            throws UserException {

        User reqUser = userService.findUserProfileByJwt(jwt);
        User user = userService.updateUser(reqUser.getId(), req);

        UserDto userDto = UserDtoMapper.toUserDto(user);

        return new ResponseEntity<>(userDto, HttpStatus.ACCEPTED);
    }

    @PutMapping("/{userId}/follow")
    public ResponseEntity<UserDto> followUser (@PathVariable Long userId,
                                               @RequestHeader("Authorization") String jwt)
            throws UserException {

        User reqUser = userService.findUserProfileByJwt(jwt);
        User user = userService.followUser(userId, reqUser);

        UserDto userDto = UserDtoMapper.toUserDto(user);
        userDto.setFollowed(UserUtil.isFollowedByReqUser(reqUser, user));

        return new ResponseEntity<>(userDto, HttpStatus.ACCEPTED);
    }


}
