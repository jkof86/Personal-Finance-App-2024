package com.revature.services;

import com.revature.models.Transaction;
import com.revature.models.TransactionType;

import java.util.List;
import java.time.LocalDate;

public interface TransactionService {

    Transaction addTransaction(Transaction transaction, int accountId);

    Transaction getTransaction(int id);

    List<Transaction> getAllTransactions();

    Transaction updateTransaction(int id, Transaction transaction);

    boolean deleteTransaction(int id);

    List<Transaction> getTransactionByAccountId(int accountId);

    List<Transaction> getTransactionByUserId(int userId);

    List<Transaction> getTransactionByDate(LocalDate date);

    List<Transaction> getRecurringTransactions();

    List<Transaction> getTransactionByType(TransactionType transactionType);

    void transferFunds(int fromAccountId, int toAccountId, float amount);
}