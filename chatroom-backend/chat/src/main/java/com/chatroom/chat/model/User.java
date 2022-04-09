package com.chatroom.chat.model;

import lombok.Data;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
public class User {
    @Size(min = 2, max = 15, message = "Username must be between 2 and 20 characters")
    private String username;

    @NotBlank(message = "You must select a country")
    private String country;

    @Min(value = 1, message = "Age must be >= 1")
    @Max(value = 120, message = "Age must be <= 120")
    private int age;

    @NotBlank(message = "You must select a gender")
    private String gender;
}
