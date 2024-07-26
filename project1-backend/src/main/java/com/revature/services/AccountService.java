package com.revature.services;

import com.revature.models.Account;

import java.util.List;

public interface AccountService {

    //Trivial Services
    public Account addAccount(Account a, int userId);
    public Account getAccount(int id);
    public List<Account> getAllAccountsByUserId(int userId);
    public Account updateAccount(Account change);
    public boolean deleteAccount(int id);

    List<Account> getAccountsByUserId(int userId);
}