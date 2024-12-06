package com.twitter.util;

import com.twitter.model.Like;
import com.twitter.model.Tweet;
import com.twitter.model.User;

public class TweetUtil {

    public static boolean isLikedByReqUser(User reqUser, Tweet tweet) {

        for(Like like : tweet.getLikes()) {
            if(like.getUser().getId().equals(reqUser.getId())) {
                return true;
            }
        }
        return false;
    }

    public static boolean isRetweetedByReqUser(User reqUser, Tweet tweet) {

        for(User user : tweet.getReTweetUser()) {
            if(user.getId().equals((reqUser.getId()))){
                return true;
            }
        }
        return false;
    }

}
