package com.jochoatest.restfulwebservices.basic.auth;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins="http://localhost:4200") //It's to solve error for access CORS 'Access-Control-Allow-Origin
public class AuthenticationController {
	
	@GetMapping(path="/basicauth")
	public AuthenticationBean authenticationBean() {
		
		return new AuthenticationBean("You are authenticated");
	}
}
