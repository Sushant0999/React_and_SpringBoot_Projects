package com.notes.keep.model;


import lombok.Data;

@Data
public class NotificationRequest {
    private String title;
    private String body;
    private String topic;
    private String token;
}