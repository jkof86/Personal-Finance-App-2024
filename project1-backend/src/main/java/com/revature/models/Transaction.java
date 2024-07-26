package com.revature.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.Objects;

@Entity
@Table(name = "Transactions")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "transaction_id", updatable = false)
    private int transactionId;

    @ManyToOne
    @JoinColumn(name = "account_id", referencedColumnName = "account_id")
    @JsonBackReference
    private Account account;

    @Column(name = "transaction_date", nullable = false)
    @Temporal(TemporalType.DATE)
    private LocalDate transactionDate;

    @Column(name = "amount", nullable = false)
    private float amount;

    @Column(name = "description")
    private String description;

    @Column(name = "recurring")
    private Boolean recurring;

    @Column(name = "recurring_frequency_type")
    private String recurringFrequency;

    @Column(name = "transaction_type", nullable = false)
    @Enumerated(EnumType.STRING)
    private TransactionType transactionType;

    @PrimaryKeyJoinColumn
    @Column(name = "related_transaction_id")
    @JoinColumn(name = "transaction_id", referencedColumnName = "transaction_id")
    private int relatedTransactionId;

    //No-arg Constructor
    public Transaction() {}
    public Transaction(int transactionId) {
        this.transactionId = transactionId;
    }

    public Transaction(Account account, LocalDate transactionDate, float amount, String description, Boolean recurring, String recurringFrequency, TransactionType transactionType, int relatedTransactionId) {
        this.account = account;
        this.transactionDate = transactionDate;
        this.amount = amount;
        this.description = description;
        this.recurring = recurring;
        this.recurringFrequency = recurringFrequency;
        this.transactionType = transactionType;
        this.relatedTransactionId = relatedTransactionId;
    }

    //Constructor for Deposit
    public Transaction(int transactionId, Account account, LocalDate transactionDate, float amount, String description, TransactionType transactionType) {
        this.transactionId = transactionId;
        this.account = account;
        this.transactionDate = transactionDate;
        this.amount = amount;
        this.description = description;
        this.transactionType = transactionType;
    }

    //Constructor for Expense (non-recurring)
    public Transaction(int transactionId, Account account, LocalDate transactionDate, float amount, String description, Boolean recurring, TransactionType transactionType) {
        this.transactionId = transactionId;
        this.account = account;
        this.transactionDate = transactionDate;
        this.amount = amount;
        this.description = description;
        this.recurring = recurring;
        this.transactionType = transactionType;
    }

    //Constructor for Expense (recurring)
    public Transaction(Account account, int transactionId, LocalDate transactionDate, float amount, String description, Boolean recurring, String recurringFrequency, TransactionType transactionType) {
        this.account = account;
        this.transactionId = transactionId;
        this.transactionDate = transactionDate;
        this.amount = amount;
        this.description = description;
        this.recurring = recurring;
        this.recurringFrequency = recurringFrequency;
        this.transactionType = transactionType;
    }

    //Constructor for Transfer (non-recurring)
    public Transaction(int transactionId, Account account, LocalDate transactionDate, float amount, String description, Boolean recurring, TransactionType transactionType, int relatedTransactionId) {
        this.transactionId = transactionId;
        this.account = account;
        this.transactionDate = transactionDate;
        this.amount = amount;
        this.description = description;
        this.recurring = recurring;
        this.transactionType = transactionType;
        this.relatedTransactionId = relatedTransactionId;
    }

    //Constructor for Transfer (recurring)
    public Transaction(int transactionId, Account account, LocalDate transactionDate, float amount, String description, Boolean recurring, String recurringFrequency, TransactionType transactionType, int relatedTransactionId) {
        this.transactionId = transactionId;
        this.account = account;
        this.transactionDate = transactionDate;
        this.amount = amount;
        this.description = description;
        this.recurring = recurring;
        this.recurringFrequency = recurringFrequency;
        this.transactionType = transactionType;
        this.relatedTransactionId = relatedTransactionId;
    }

    public int getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(int transactionId) {
        this.transactionId = transactionId;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account accountId) {
        this.account = accountId;
    }

    public LocalDate getTransactionDate() {
        return transactionDate;
    }

    public void setTransactionDate(LocalDate transactionDate) {
        this.transactionDate = transactionDate;
    }

    public float getAmount() {
        return amount;
    }

    public void setAmount(float amount) {
        this.amount = amount;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean getRecurring() {
        return recurring;
    }

    public void setRecurring(Boolean recurring) {
        this.recurring = recurring;
    }

    public String getRecurringFrequency() {
        return recurringFrequency;
    }

    public void setRecurringFrequency(String recurringFrequency) {
        this.recurringFrequency = recurringFrequency;
    }

    public TransactionType getTransactionType() {
        return transactionType;
    }

    public void setTransactionType(TransactionType transactionType) {
        this.transactionType = transactionType;
    }

    public int getRelatedTransactionId() {
        return relatedTransactionId;
    }

    public void setRelatedTransactionId(int relatedTransactionId) {
        this.relatedTransactionId = relatedTransactionId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Transaction that = (Transaction) o;
        return transactionId == that.transactionId && account == that.account && Float.compare(amount, that.amount) == 0 && relatedTransactionId == that.relatedTransactionId && Objects.equals(transactionDate, that.transactionDate) && Objects.equals(description, that.description) && Objects.equals(recurring, that.recurring) && Objects.equals(recurringFrequency, that.recurringFrequency) && Objects.equals(transactionType, that.transactionType);
    }

    @Override
    public int hashCode() {
        return Objects.hash(transactionId, account, transactionDate, amount, description, recurring, recurringFrequency, transactionType, relatedTransactionId);
    }

    @Override
    public String toString() {
        return "Transactions{" +
                "transactionId=" + transactionId +
                ", accountId=" + account +
                ", transactionDate=" + transactionDate +
                ", amount=" + amount +
                ", description='" + description + '\'' +
                ", recurring=" + recurring +
                ", recurringFrequency='" + recurringFrequency + '\'' +
                ", transactionType='" + transactionType + '\'' +
                ", relatedTransactionId=" + relatedTransactionId +
                '}';
    }
}
