package com.revature.services;

import com.revature.exceptions.AccountNotFoundException;
import com.revature.models.Account;
import com.revature.models.Transaction;
import com.revature.models.TransactionType;
import com.revature.repositories.AccountRepository;
import com.revature.repositories.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
public class TransactionServiceImpl implements TransactionService {

    private final TransactionRepository transactionRepo;
    private final AccountRepository accountRepo;

    @Autowired
    public TransactionServiceImpl(TransactionRepository transactionRepo, AccountRepository accountRepo) {
        this.transactionRepo = transactionRepo;
        this.accountRepo = accountRepo;
    }

    @Override
    @Transactional
    public Transaction addTransaction(Transaction transaction, int accountId) {
        Account acc = accountRepo.findById(accountId)
                .orElseThrow(() -> new AccountNotFoundException("Account with id " + accountId + " not found"));

        // Update the account balance
        updateAccountBalance(acc, transaction, true);

        acc.getTransactions().add(transaction);
        transaction.setAccount(acc);

        return transactionRepo.save(transaction);
    }

    @Override
    @Transactional(readOnly = true)
    public Transaction getTransaction(int id) {
        return transactionRepo.findById(id).orElse(null);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Transaction> getAllTransactions() {
        return transactionRepo.findAll();
    }

    @Override
    @Transactional
    public Transaction updateTransaction(int transacId, Transaction transaction) {
        if (transactionRepo.existsById(transacId)) {
            Transaction existingTransaction = transactionRepo.findById(transacId).orElseThrow(
                    () -> new IllegalStateException("Transaction not found with ID " + transacId)
            );

            Account acc = existingTransaction.getAccount();
            if (acc == null) {
                throw new IllegalStateException("Account associated with the transaction not found");
            }

            // Reverse the balance change of the existing transaction
            updateAccountBalance(acc, existingTransaction, false);

            // Apply the balance change of the updated transaction
            updateAccountBalance(acc, transaction, true);

            existingTransaction.setTransactionDate(transaction.getTransactionDate());
            existingTransaction.setAmount(transaction.getAmount());
            existingTransaction.setDescription(transaction.getDescription());
            existingTransaction.setRecurring(transaction.getRecurring());
            existingTransaction.setRecurringFrequency(transaction.getRecurringFrequency());
            existingTransaction.setTransactionType(transaction.getTransactionType());

            accountRepo.save(acc);
            return transactionRepo.save(existingTransaction);
        } else {
            throw new IllegalStateException("Transaction not found with ID " + transacId);
        }
    }

    @Override
    @Transactional
    public boolean deleteTransaction(int id) {
        if (transactionRepo.existsById(id)) {
            Transaction existingTransaction = transactionRepo.findById(id).orElseThrow(
                    () -> new IllegalStateException("Transaction not found with ID " + id)
            );

            Account acc = existingTransaction.getAccount();

            // Reverse the balance change of the existing transaction
            updateAccountBalance(acc, existingTransaction, false);

            acc.getTransactions().remove(existingTransaction);
            accountRepo.save(acc);
            transactionRepo.deleteById(id);

            return true;
        }
        return false;
    }

    @Override
    @Transactional(readOnly = true)
    public List<Transaction> getTransactionByAccountId(int accountId) {
        return transactionRepo.findByAccountId(accountId);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Transaction> getTransactionByUserId(int userId) {
        return transactionRepo.findByUserId(userId);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Transaction> getTransactionByDate(LocalDate date) {
        return transactionRepo.findByTransactionDate(date);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Transaction> getRecurringTransactions() {
        return transactionRepo.findByRecurring(true);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Transaction> getTransactionByType(TransactionType transactionType) {
        return transactionRepo.findByTransactionType(transactionType);
    }

    @Override
    @Transactional
    public void transferFunds(int fromAccountId, int toAccountId, float amount) {
        Account fromAccount = accountRepo.findById(fromAccountId)
                .orElseThrow(() -> new RuntimeException("From account not found"));
        Account toAccount = accountRepo.findById(toAccountId)
                .orElseThrow(() -> new RuntimeException("To account not found"));

        if (fromAccount.getBalance().compareTo(BigDecimal.valueOf(amount)) < 0) {
            throw new RuntimeException("Insufficient funds");
        }

        fromAccount.setBalance(fromAccount.getBalance().subtract(BigDecimal.valueOf(amount)));
        toAccount.setBalance(toAccount.getBalance().add(BigDecimal.valueOf(amount)));

        accountRepo.save(fromAccount);
        accountRepo.save(toAccount);
    }

    private void updateAccountBalance(Account acc, Transaction transaction, boolean isAdding) {
        BigDecimal amount = BigDecimal.valueOf(transaction.getAmount());
        switch (acc.getAccountType()) {
            case CREDIT:
                if (transaction.getTransactionType() == TransactionType.EXPENSE) {
                    acc.setBalance(isAdding ? acc.getBalance().add(amount) : acc.getBalance().subtract(amount));
                } else if (transaction.getTransactionType() == TransactionType.DEPOSIT) {
                    acc.setBalance(isAdding ? acc.getBalance().subtract(amount) : acc.getBalance().add(amount));
                }
                break;
            case DEBIT:
            case LOAN:
                if (transaction.getTransactionType() == TransactionType.EXPENSE) {
                    acc.setBalance(isAdding ? acc.getBalance().subtract(amount) : acc.getBalance().add(amount));
                } else if (transaction.getTransactionType() == TransactionType.DEPOSIT) {
                    acc.setBalance(isAdding ? acc.getBalance().add(amount) : acc.getBalance().subtract(amount));
                }
                break;
            default:
                throw new IllegalStateException("Unknown account type: " + acc.getAccountType());
        }
    }
}
