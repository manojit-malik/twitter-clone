package com.twitter.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "tweet")
public class Tweet {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@ManyToOne
	private User user;
	
	private String content;
	private String image;
	private String video;
	
	@OneToMany(mappedBy = "tweet", cascade = CascadeType.ALL)
	private List <Like> likes = new ArrayList<>();
	
	@OneToMany
	private List <Tweet> replyTweets = new ArrayList<>();
	
	@ManyToMany
	private List <User> reTweetUser = new ArrayList<>();
	
	@ManyToOne
	private Tweet replyFor;
	
	private boolean isReply;
	private boolean isTweet;

	private LocalDateTime createdAt;
	
}
