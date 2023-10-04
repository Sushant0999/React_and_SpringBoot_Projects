package com.notes.keep.service;

import com.notes.keep.model.AuthRequest;
import com.notes.keep.model.User;
import com.notes.keep.repository.UserRepository;
import com.notes.keep.utils.EncryptionUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private BCryptPasswordEncoder encoder;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EncryptionUtil encryptionUtil;

    @Override
    public User createUser(User user) {
        user.setRole("USER");
        user.setPassword(encoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @Override
    public User findByUserId(Integer userId) {
        User user = userRepository.findById(userId).get();
        return userRepository.findById(userId).get();
    }


    @Override
    public User loginUser(AuthRequest user) {
        System.out.println(user.getEmail() + " " + user.getPassword());
        User user1 = userRepository.findByEmail(user.getEmail());
        String password = encryptionUtil.encrypt(user1.getPassword());
        if (password.equals(user.getPassword())) {
            return null;
        }
        return user1;
    }

    @Override
    public List<User> getAllUser() {
        return userRepository.findAll();
    }

    @Override
    public boolean checkEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    //METHODS NEEDS TO IMPLEMENT

    @Override
    public void updateResetPasswordToken(String token, String email) {

    }

//    @Override
//    public UserDetails getResetPasswordToken(String token) {
//        return null;
//    }
//
//    @Override
//    public void updatePassword(UserDetails user, String newPassword) {
//
//    }

}