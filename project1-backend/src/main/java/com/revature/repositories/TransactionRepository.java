package com.revature.repositories;

import com.revature.models.Transaction;
import com.revature.models.TransactionType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Integer> {

    @Query("SELECT t FROM Transaction t WHERE t.account.accountId = :accountId")
    List<Transaction> findByAccountId(int accountId);

    @Query("SELECT t FROM Transaction t JOIN t.account a JOIN a.userId u WHERE u.userId = :userId")
    List<Transaction> findByUserId(@Param("userId") int userId);

    List<Transaction> findByTransactionDate(LocalDate date);

    List<Transaction> findByRecurring(boolean recurring);

    List<Transaction> findByTransactionType(TransactionType transactionType);
}
