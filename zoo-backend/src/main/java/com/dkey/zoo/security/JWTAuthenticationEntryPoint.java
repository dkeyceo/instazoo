package com.dkey.zoo.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import com.dkey.zoo.payload.response.InvalidLoginResponse;
import com.google.gson.Gson;

@Component
public class JWTAuthenticationEntryPoint implements AuthenticationEntryPoint {

	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException authException) throws IOException, ServletException {
		InvalidLoginResponse loginResponse = new InvalidLoginResponse();
		String jsonLoginResponse = new Gson().toJson(loginResponse);
		response.setContentType(SecurityConstants.CONTENT_TYPE);
		response.setStatus(HttpStatus.UNAUTHORIZED.value());
		response.getWriter().println(jsonLoginResponse);
	}

}
