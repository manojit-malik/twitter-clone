package com.twitter;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = "com.twitter")
@EntityScan(basePackages = "com.twitter.model")
@EnableJpaRepositories(basePackages = "com.twitter.repository")
public class TwitterBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(TwitterBackendApplication.class, args);
	}

}
