
package com.ecom.backend.filters;

import com.ecom.backend.service.CustomerService;
import com.ecom.backend.utils.Jwtutil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private Jwtutil jwtutil;

    @Autowired
    private CustomerService customerService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // Extract the token from the Authorization header
        String authorizationHeader = request.getHeader("Authorization");
        String username = null;
        String token = null;

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            token = authorizationHeader.substring(7);  // Get token by removing "Bearer "
            username = jwtutil.extractUsername(token);  // Extract username from token
        }

        // Validate token and set authentication context
        if (username != null && jwtutil.isTokenValid(token, username)) {
            // Load the user details by username (this could be your CustomerService implementation)
            var userDetails = customerService.loadUserByUsername(username);

            // Create the authentication token with authorities
            UsernamePasswordAuthenticationToken authToken =
                    new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

            // Set the authentication token into the SecurityContext
            SecurityContextHolder.getContext().setAuthentication(authToken);
        }

        // Continue with the filter chain
        filterChain.doFilter(request, response);
    }
}
