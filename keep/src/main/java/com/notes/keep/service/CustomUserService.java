package com.notes.keep.service;

import com.notes.keep.dto.LoginInfoDTO;
import com.notes.keep.dto.UserDTO;
import com.notes.keep.model.AuthRequest;
import com.notes.keep.model.User;
import org.springframework.security.core.userdetails.UserDetailsService;


import javax.security.auth.login.CredentialExpiredException;
import java.util.List;
import java.util.UUID;

public interface CustomUserService extends UserDetailsService{

    public UserDTO createUser(User user);

    public User findByUserId(UUID userId);

    public UserDTO loginUser(AuthRequest user);

    public List<User> getAllUser();

    public boolean checkEmail(String email);

    public void resetPassword(String email);

    public void updatePassword(String email, String token, String password) throws CredentialExpiredException;

    public void sendVerificationMail(String email);

    public void sendLoginInfo(String email, LoginInfoDTO infoDTO);

}
