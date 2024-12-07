package com.twitter.controller;

import com.twitter.dto.TweetDto;
import com.twitter.dto.mapper.TweetDtoMapper;
import com.twitter.exception.TweetException;
import com.twitter.exception.UserException;
import com.twitter.model.Tweet;
import com.twitter.model.User;
import com.twitter.request.TweetReplyRequest;
import com.twitter.response.ApiResponse;
import com.twitter.service.TweetService;
import com.twitter.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tweets")
public class TweetController {

    @Autowired
    private TweetService tweetService;

    @Autowired
    private UserService userService;

    @PostMapping("/create")
    public ResponseEntity<TweetDto> createTweet(@RequestBody Tweet req,
                                                @RequestHeader ("Authorization") String jwt) throws UserException, TweetException {

        User user =userService.findUserProfileByJwt(jwt);

        Tweet tweet = tweetService.createTweet(req, user);

        TweetDto tweetDto = TweetDtoMapper.toTweetDto(tweet, user);
        return new ResponseEntity<>(tweetDto, HttpStatus.CREATED);

    }

    @PostMapping("/reply")
    public ResponseEntity<TweetDto> replyTweet(@RequestBody TweetReplyRequest req,
                                                @RequestHeader ("Authorization") String jwt) throws UserException, TweetException {

        User user =userService.findUserProfileByJwt(jwt);

        Tweet tweet = tweetService.createReply(req, user);

        TweetDto tweetDto = TweetDtoMapper.toTweetDto(tweet, user);
        return new ResponseEntity<>(tweetDto, HttpStatus.CREATED);

    }

    @PutMapping("/{tweetId}/retweet")
    public ResponseEntity<TweetDto> reTweet(@PathVariable Long tweetId,
                                               @RequestHeader ("Authorization") String jwt) throws UserException, TweetException {

        User user =userService.findUserProfileByJwt(jwt);

        Tweet tweet = tweetService.retweet(tweetId, user);

        TweetDto tweetDto = TweetDtoMapper.toTweetDto(tweet, user);
        return new ResponseEntity<>(tweetDto, HttpStatus.OK);

    }

    @GetMapping("/{tweetId}")
    public ResponseEntity<TweetDto> findTweetById(@PathVariable Long tweetId,
                                            @RequestHeader ("Authorization") String jwt) throws UserException, TweetException {

        User user =userService.findUserProfileByJwt(jwt);

        Tweet tweet = tweetService.findById(tweetId);

        TweetDto tweetDto = TweetDtoMapper.toTweetDto(tweet, user);
        return new ResponseEntity<>(tweetDto, HttpStatus.OK);

    }

    @DeleteMapping("/{tweetId}")
    public ResponseEntity<ApiResponse> deleteTweet(@PathVariable Long tweetId,
                                                  @RequestHeader ("Authorization") String jwt) throws UserException, TweetException {

        User user =userService.findUserProfileByJwt(jwt);

        tweetService.deleteTweetById(tweetId, user.getId());

        ApiResponse res = new ApiResponse();
        res.setMessage("Tweet deleted successfully");
        res.setStatus(true);

        return new ResponseEntity<>(res, HttpStatus.OK);

    }

    @GetMapping("/")
    public ResponseEntity<List<TweetDto>> getAllTweets(
            @RequestHeader ("Authorization") String jwt) throws UserException, TweetException {

        User user =userService.findUserProfileByJwt(jwt);

        List<Tweet> tweets = tweetService.findAllTweet();

        List<TweetDto> tweetDtos = TweetDtoMapper.toTweetDtos(tweets, user);
        return new ResponseEntity<>(tweetDtos, HttpStatus.OK);

    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<TweetDto>> getUserAllTweets(@PathVariable Long userId,
            @RequestHeader ("Authorization") String jwt) throws UserException, TweetException {

        User user =userService.findUserProfileByJwt(jwt);

        List<Tweet> tweets = tweetService.getUserTweet(user);

        List<TweetDto> tweetDtos = TweetDtoMapper.toTweetDtos(tweets, user);
        return new ResponseEntity<>(tweetDtos, HttpStatus.OK);

    }

    @GetMapping("/user/{userId}/likes")
    public ResponseEntity<List<TweetDto>> findTweetByLikesContainsUser(@PathVariable Long userId,
                                                           @RequestHeader ("Authorization") String jwt) throws UserException, TweetException {

        User user =userService.findUserProfileByJwt(jwt);

        List<Tweet> tweets = tweetService.findByLikesContainsUser(user );

        List<TweetDto> tweetDtos = TweetDtoMapper.toTweetDtos(tweets, user);
        return new ResponseEntity<>(tweetDtos, HttpStatus.OK);

    }

    

}
