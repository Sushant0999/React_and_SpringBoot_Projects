package com.notes.keep.dto;


import com.notes.keep.model.AuthResponse;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;

import java.util.UUID;

@Builder
@ToString
@Data
public class UserDTO {
    private UUID userId;
    private String name;
    private String email;
    private byte[] image;
    private AuthResponse response;
}
