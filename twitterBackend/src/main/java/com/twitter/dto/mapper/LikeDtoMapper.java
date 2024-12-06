package com.twitter.dto.mapper;

import com.twitter.dto.LikeDto;
import com.twitter.dto.TweetDto;
import com.twitter.dto.UserDto;
import com.twitter.model.Like;
import com.twitter.model.User;

import java.util.ArrayList;
import java.util.List;

public class LikeDtoMapper {

    public static LikeDto toLikeDto(Like like, User reqUser) {
        UserDto user = UserDtoMapper.toUserDto(like.getUser());
        UserDto reqUserDto = UserDtoMapper.toUserDto(reqUser);
        TweetDto tweet = TweetDtoMapper.toTweetDto(like.getTweet(), reqUser);

        LikeDto likeDto = new LikeDto();

        likeDto.setId(like.getId());
        likeDto.setId(like.getId());
        likeDto.setTweet(tweet);
        likeDto.setUser(user);

        return likeDto;
    }

    public static List<LikeDto> toLikeDtos(List<Like> likes, User reqUser) {
        List<LikeDto> likeDtos = new ArrayList<>();

        for(Like like : likes) {
            UserDto user = UserDtoMapper.toUserDto(reqUser);
            TweetDto tweet = TweetDtoMapper.toTweetDto(like.getTweet(), reqUser);

            LikeDto likeDto = new LikeDto();

            likeDto.setId(like.getId());
            likeDto.setId(like.getId());
            likeDto.setTweet(tweet);
            likeDto.setUser(user);

            likeDtos.add(likeDto);

        }
        return  likeDtos;
    }

}
