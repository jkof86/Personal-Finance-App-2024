package com.revature.exceptions;

public class DuplicateAccountException extends RuntimeException {

    public DuplicateAccountException(String msg) {
        super(msg);
    }

    public DuplicateAccountException() {}
}