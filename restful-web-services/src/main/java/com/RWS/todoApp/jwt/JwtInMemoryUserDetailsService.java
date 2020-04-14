package com.RWS.todoApp.jwt;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class JwtInMemoryUserDetailsService implements UserDetailsService {

  static List<JwtUserDetails> inMemoryUserList = new ArrayList<>();

  static {
    inMemoryUserList.add(new JwtUserDetails(1L, "jochoaTest",
        "$2a$10$Vh5FwkjOHtewS9sliwIPOu9wWDP584g6O9h36B3iy0KJMHLY9hTdS", "ROLE_USER_2"));
    inMemoryUserList.add(new JwtUserDetails(2L, "juanochoa",
    		"$2a$10$JKxJO.gOWO1U2Zp0/dPB3.nIdymdtq.gZ.f8/BOOESEBGj85Z/oEy",
    		"ROLE_USER_1"));
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    Optional<JwtUserDetails> findFirst = inMemoryUserList.stream()
        .filter(user -> user.getUsername().equals(username)).findFirst();

    if (!findFirst.isPresent()) {
      throw new UsernameNotFoundException(String.format("USER_NOT_FOUND '%s'.", username));
    }

    return findFirst.get();
  }

}


