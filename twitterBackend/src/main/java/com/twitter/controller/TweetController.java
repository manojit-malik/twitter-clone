package com.twitter.controller;

import com.twitter.model.User;
import com.twitter.service.TweetService;
import com.twitter.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/tweets")
public class TweetController {

    @Autowired
    private TweetService tweetService;

    @Autowired
    private UserService userService;

//    public responseEntity<TweetDto>
    

}
