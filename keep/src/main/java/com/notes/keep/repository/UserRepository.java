package com.notes.keep.repository;

import com.notes.keep.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@EnableJpaRepositories
public interface UserRepository extends JpaRepository<User, UUID>{

    boolean existsByEmail(String email);

    Optional<User> findByEmail(String email);

    Optional<User> findById(UUID userId);

    User findByFirstName(String firstName);

    List<User> findUserByDate(long date);


}
