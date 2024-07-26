package com.revature.repositories;

import com.revature.models.Account;
import com.revature.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {
    Optional<Account> findByAccountIdAndAccountName(int accountId, String accountName);

    Optional<List<Account>> findAllAccountByUserId(User userId);
}