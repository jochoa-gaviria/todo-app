package com.RWS.todoApp;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class BcryptEncoderTest {

	public static void main(String[] args) {
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		
		for(int i=1; i<=10;i++) {
			String encondedString = encoder.encode("abcd123$");
			
			System.out.println(encondedString);
		}	
	}
}
