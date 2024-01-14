package com.demo.jwt.config;

import com.demo.jwt.token.InvalidToken;
import com.demo.jwt.token.JwtService;
import com.demo.jwt.token.TokenRepository;
import com.demo.jwt.token.TokenType;
import com.demo.jwt.user.User;
import com.demo.jwt.user.UserRepository;
import com.demo.jwt.user.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LogoutService implements LogoutHandler {

    private final TokenRepository tokenRepository;
    private final UserService userService;
    private final JwtService jwtService;

    @Override
    public void logout(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication
    ) {
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        if (authHeader == null ||!authHeader.startsWith("Bearer ")) {
            return;
        }
        jwt = authHeader.substring(7);
        Boolean isInvalidToken = tokenRepository.existsByToken(jwt);
        if (!isInvalidToken) {
            String username = jwtService.extractUsername(jwt);
            User user = userService.findByEmail(username);
            tokenRepository.save(new InvalidToken(jwt, TokenType.BEARER,user));
            SecurityContextHolder.clearContext();
        }
    }
}