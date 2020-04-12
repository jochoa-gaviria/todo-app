package com.RWS.todoApp.jwt.resource;

public class AuthenticationException extends RuntimeException {
    
	public AuthenticationException(String message, Throwable cause) {
        super(message, cause);
    }
}

