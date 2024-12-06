package com.twitter.service;

import com.twitter.exception.TweetException;
import com.twitter.exception.UserException;
import com.twitter.model.Tweet;
import com.twitter.model.User;
import com.twitter.request.TweetReplyRequest;

import java.util.List;

public interface TweetService {

    public Tweet createTweet(Tweet req, User user) throws UserException;
    public List<Tweet>findAllTweet();
    public Tweet retweet(Long tweetId, User user) throws UserException, TweetException;
    public Tweet findById(Long tweetId) throws TweetException;

    public void deleteTweetById(Long tweetId, Long userId) throws TweetException, UserException;

    public Tweet removeFromRetweet(Long tweetId, User user) throws TweetException, UserException;

    public Tweet createReply(TweetReplyRequest req, User user) throws TweetException;

    public List <Tweet> getUserTweet(User user);

    public List<Tweet> findByLikesContainsUser (User user);





}
