package com.revature.exceptions;

public class AccountNotFoundException extends RuntimeException {

    public AccountNotFoundException() {}

    public AccountNotFoundException(String msg) {
        super(msg);
    }
}