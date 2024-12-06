package com.twitter.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@Entity
@Data
@Table(name = "user")
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	private String fullName;
	private String location;
	private String website;
	private String birthDate;
	private String email;
	private String password;
	private String mobile;
	private String image;
	private String backgroundImage;
	private String bio;
	private boolean reg_user;
	private boolean login_with_google;
	
	@JsonIgnore
	@OneToMany(mappedBy = "user",cascade= CascadeType.ALL)
	private List <Tweet> tweet = new ArrayList<>();
	
	@OneToMany(mappedBy = "user",cascade= CascadeType.ALL)
	private List <Like> like = new ArrayList<>();
	
	@Embedded
	private Verified verification;
	
	@JsonIgnore
	@ManyToMany
	private List <User> followers = new ArrayList<>();
	
	@JsonIgnore
	@ManyToMany
	private List <User> followings = new ArrayList<>();
}
