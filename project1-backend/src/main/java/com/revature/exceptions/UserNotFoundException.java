package com.revature.exceptions;

import com.revature.models.User;

public class UserNotFoundException extends RuntimeException{

    public UserNotFoundException(String msg){
        super(msg);
    }

    public UserNotFoundException(){

    }
}