package com.revature.controllers;

import com.revature.models.Account;
import com.revature.services.AccountServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping()
public class AccountController {

    private AccountServiceImpl accountService;

    @Autowired
    public AccountController(AccountServiceImpl accountService) {
        this.accountService = accountService;
    }

    @GetMapping("/{accountId}")
    public ResponseEntity<Account> getAccountDetails(@PathVariable int accountId) {
        Account account = accountService.getAccount(accountId);
        if (account != null) {
            return ResponseEntity.ok(account);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PostMapping("accounts/add/{UserId}")
    public ResponseEntity<Account> addAccount(@RequestBody Account account, @PathVariable int UserId) {
        return ResponseEntity.ok(accountService.addAccount(account, UserId));
    }

    @GetMapping("users/{userId}/accounts")
    public ResponseEntity<List<Account>> getAccountByUserId(@PathVariable int userId) {
        List<Account> accounts = accountService.getAccountsByUserId(userId);
        return ResponseEntity.ok(accounts);
    }

    @DeleteMapping("accounts/delete/{id}")
    public ResponseEntity<Boolean> deleteAccount(@PathVariable int id) {
        return ResponseEntity.ok(accountService.deleteAccount(id));
    }

    @PutMapping("accounts/update")
    public ResponseEntity<Account> updateAccount(@RequestBody Account a) {
        return ResponseEntity.ok(accountService.updateAccount(a));
    }
}