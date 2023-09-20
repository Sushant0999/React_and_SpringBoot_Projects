package com.notes.keep.service;

import com.notes.keep.model.User;
import com.notes.keep.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User createUser(User user){
        return userRepository.save(user);
    }

    public List<User> userList(){
        return userRepository.findAll();
    }
}
