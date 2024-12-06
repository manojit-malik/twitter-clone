package com.twitter.service;

import com.twitter.exception.TweetException;
import com.twitter.exception.UserException;
import com.twitter.model.Like;
import com.twitter.model.Tweet;
import com.twitter.model.User;
import com.twitter.repository.LikesRepository;
import com.twitter.repository.TweetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LikeServiceImplementation implements LikeService{

    @Autowired
    private LikesRepository likesRepository;

    @Autowired
    private TweetService tweetService;

    @Autowired
    private TweetRepository tweetRepository;

    @Override
    public Like likeTweet(Long tweetId, User user) throws UserException, TweetException {
        Like isLikeExist = likesRepository.isLikeExist(user.getId(), tweetId);
        if(isLikeExist!=null){
            likesRepository.deleteById(isLikeExist.getId());
            return isLikeExist;
        }

        Tweet tweet = tweetService.findById(tweetId);

        Like like = new Like();
        like.setTweet(tweet);
        like.setUser(user);
        Like savedLike = likesRepository.save(like);

        tweet.getLikes().add(savedLike);
        tweetRepository.save(tweet);

        return savedLike;
    }

    @Override
    public List<Like> getAllLikes(Long tweetId) throws TweetException {

        Tweet tweet = tweetService.findById(tweetId);
        List <Like> likes = likesRepository.findByTweetId(tweetId);
        return likes;
    }
}
