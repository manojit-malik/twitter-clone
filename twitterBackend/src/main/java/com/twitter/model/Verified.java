package com.twitter.model;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class Verified {
	
	private boolean status = false;
	
	private LocalDateTime startedAt;
	private LocalDateTime endsAt;
	private String planType;
	
	
	
	
}
