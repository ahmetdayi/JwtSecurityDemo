package com.demo.jwt.token;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TokenRepository extends JpaRepository<InvalidToken, String> {
    Boolean existsByToken(String token);
    InvalidToken findByToken(String token);
}
