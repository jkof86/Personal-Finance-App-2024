package com.revature.exceptions;

public class DuplicateUserException extends RuntimeException{

    public DuplicateUserException(String msg){
        super(msg);
    }

    public DuplicateUserException(){

    }
}