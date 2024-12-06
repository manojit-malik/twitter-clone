package com.twitter.service;

import com.twitter.exception.TweetException;
import com.twitter.exception.UserException;
import com.twitter.model.Like;
import com.twitter.model.Tweet;
import com.twitter.model.User;

import java.util.List;

public interface LikeService {

    public Like likeTweet(Long tweetId, User user) throws UserException, TweetException;

    public List<Like> getAllLikes(Long tweetId) throws TweetException;


}
