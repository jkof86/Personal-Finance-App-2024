package com.revature.services;

import com.revature.exceptions.AccountNotFoundException;
import com.revature.exceptions.UserNotFoundException;
import com.revature.models.Account;
import com.revature.models.User;
import com.revature.repositories.AccountRepository;
import com.revature.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountServiceImpl implements AccountService {

    private AccountRepository accountRepository;
    private UserRepository userRepository;

    @Autowired
    public AccountServiceImpl(AccountRepository accountRepository, UserRepository userRepository) {
        this.accountRepository = accountRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Account addAccount(Account a, int userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User with id " + userId + " not found."));

        a.setUserId(user);
        user.getAccounts().add(a);

        return accountRepository.save(a);
    }

    @Override
    public Account getAccount(int id) {

        return accountRepository.findById(id)
                .orElseThrow(() -> new AccountNotFoundException("Account with id " + id + " not found."));
    }

    @Override
    public List<Account> getAllAccountsByUserId(int userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User with id " + userId + " not found."));

        return user.getAccounts();
    }

    @Override
    public Account updateAccount(Account change) {

        Account updatedAccount = accountRepository.findById(change.getAccountId())
                .orElseThrow(() -> new AccountNotFoundException("Account with id " + change.getAccountId() + " not found."));

        updatedAccount.setAccountId(change.getAccountId());
        updatedAccount.setApr(change.getApr());
        updatedAccount.setBalance(change.getBalance());
        updatedAccount.setCreditLimit(change.getCreditLimit());
        updatedAccount.setPrincipal(change.getPrincipal());
        updatedAccount.setMinMonthlyPayment(change.getMinMonthlyPayment());
        updatedAccount.setLoanDisbursementDate(change.getLoanDisbursementDate());
        updatedAccount.setAccountName(change.getAccountName());
        updatedAccount.setAccountType(change.getAccountType());

        return accountRepository.save(updatedAccount);
    }

    @Override
    public boolean deleteAccount(int id) {

        if (!accountRepository.existsById(id)) {
            throw new AccountNotFoundException("Account with id " + id + " not found.");
        }

        accountRepository.deleteById(id);

        return !accountRepository.existsById(id);
    }


    @Override
    public List<Account> getAccountsByUserId(int userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User with id " + userId + " not found."));

        return accountRepository.findAllAccountByUserId(user).get();
    }
}
