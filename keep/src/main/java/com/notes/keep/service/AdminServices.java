package com.notes.keep.service;

import com.notes.keep.dto.UserDTO;
import com.notes.keep.model.User;
import com.notes.keep.repository.AdminRepository;
import com.notes.keep.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.sql.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminServices {
    @Autowired
    private PasswordEncoder encoder;
    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private UserRepository userRepository;

    public AdminServices() {
    }

    public List<UserDTO> userList() {
        List<User> users = userRepository.findAll();

        if (users.isEmpty()) {
            return Collections.emptyList();
        }

        return users.stream()
                .map(user -> UserDTO.builder()
                        .userId(user.getUserId())
                        .email(user.getEmail())
                        .name(user.getFirstName() + " " + user.getLastName())
                        .image(user.getImage())
                        .build())
                .collect(Collectors.toList());
    }


    public UserDTO findUserByEmail(String email) {
        User user = userRepository.findByEmail(email);
        UserDTO userDTO = null;
        if(user == null){
            return userDTO;
        }
        userDTO = UserDTO.builder().userId(user.getUserId()).name(user.getFirstName() + " " + user.getLastName()).email(user.getEmail()).image(user.getImage()).build();
        return userDTO;
    }

    public UserDTO findUserByName(String name) {
        User user = userRepository.findByFirstName(name);
        UserDTO userDTO = null;
        if(user == null){
            return userDTO;
        }
        userDTO = UserDTO.builder().userId(user.getUserId()).name(user.getFirstName() + " " + user.getLastName()).email(user.getEmail()).image(user.getImage()).build();
        return userDTO;
    }

    public List<UserDTO> userListByDate(long date) {

        System.out.println(date);

        Date sqlDate = new Date(date);

        System.out.println("java.sql.Date: " + sqlDate);

        List<User> users = userRepository.findUserByDate(date);

        System.out.println(users);

        if (users.isEmpty()) {
            return Collections.emptyList();
        }

        return users.stream()
                .map(user -> UserDTO.builder()
                        .userId(user.getUserId())
                        .email(user.getEmail())
                        .name(user.getFirstName() + " " + user.getLastName())
                        .image(user.getImage())
                        .build())
                .collect(Collectors.toList());
    }

}
//findUserByDate