
package com.revature.controllers;

import com.revature.models.Transaction;
import com.revature.models.TransactionType;
import com.revature.services.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/transactions")
public class TransactionController {

    private final TransactionService transactionService;

    @Autowired
    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @PostMapping("/{accountId}")
    public ResponseEntity<Transaction> addTransaction(@RequestBody Transaction transaction, @PathVariable int accountId) {
        Transaction createdTransaction = transactionService.addTransaction(transaction, accountId);
        return ResponseEntity.ok(createdTransaction);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Transaction> getTransaction(@PathVariable int id) {
        Transaction transaction = transactionService.getTransaction(id);
        if (transaction != null) {
            return ResponseEntity.ok(transaction);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Transaction>> getAllTransactions() {
        List<Transaction> transactions = transactionService.getAllTransactions();
        return ResponseEntity.ok(transactions);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Transaction> updateTransaction(@PathVariable int id, @RequestBody Transaction transaction) {
        Transaction updatedTransaction = transactionService.updateTransaction(id, transaction);
        return ResponseEntity.ok(updatedTransaction);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTransaction(@PathVariable int id) {
        boolean isDeleted = transactionService.deleteTransaction(id);
        if (isDeleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/account/{accountId}")
    public ResponseEntity<List<Transaction>> getTransactionByAccountId(@PathVariable int accountId) {
        List<Transaction> transactions = transactionService.getTransactionByAccountId(accountId);
        return ResponseEntity.ok(transactions);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Transaction>> getTransactionByUserId(@PathVariable int userId) {
        List<Transaction> transactions = transactionService.getTransactionByUserId(userId);
        return ResponseEntity.ok(transactions);
    }

    @GetMapping("/date/{date}")
    public ResponseEntity<List<Transaction>> getTransactionByDate(@PathVariable LocalDate date) {
        List<Transaction> transactions = transactionService.getTransactionByDate(date);
        return ResponseEntity.ok(transactions);
    }

    @GetMapping("/recurring")
    public ResponseEntity<List<Transaction>> getRecurringTransactions() {
        List<Transaction> transactions = transactionService.getRecurringTransactions();
        return ResponseEntity.ok(transactions);
    }

    @GetMapping("/type/{transactionType}")
    public ResponseEntity<List<Transaction>> getTransactionByType(@PathVariable TransactionType transactionType) {
        List<Transaction> transactions = transactionService.getTransactionByType(transactionType);
        return ResponseEntity.ok(transactions);
    }

    @PostMapping("/transfer")
    public ResponseEntity<Void> transferFunds(@RequestParam int fromAccountId, @RequestParam int toAccountId, @RequestParam float amount) {
        try {
            transactionService.transferFunds(fromAccountId, toAccountId, amount);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
