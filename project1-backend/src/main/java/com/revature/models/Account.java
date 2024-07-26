package com.revature.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "accounts")
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "account_id", updatable = false)
    private int accountId;

    @ManyToOne
    @JsonBackReference
    private User userId;

    @Column(name = "account_name", nullable = false, length = 100)
    private String accountName;

    @Column(name = "balance", nullable = false)
    private BigDecimal balance;

    @Column(name = "account_type", nullable = false)
    @Enumerated(EnumType.STRING)
    private AccountType accountType;

    @Column(name = "credit_limit")
    private BigDecimal creditLimit;

    @Column(name = "apr")
    private BigDecimal apr;

    @Column(name = "principal")
    private BigDecimal principal;

    @Column(name = "loan_disbursement_date")
    @Temporal(TemporalType.DATE)
    private LocalDate loanDisbursementDate;

    @Column(name = "loan_repayment_date")
    @Temporal(TemporalType.DATE)
    private LocalDate loanRepaymentDate;

    @Column(name = "min_monthly_payment")
    private BigDecimal minMonthlyPayment;

    @OneToMany(mappedBy = "account", fetch = FetchType.EAGER, orphanRemoval = true)
    @JsonManagedReference
    private List<Transaction> transactions;

    public Account() {

    }
    public Account(int accountId) {
        this.accountId = accountId;
    }

    //Constructor for a Credit account
    public Account(int accountId, User userId, String accountName, BigDecimal balance, AccountType accountType, BigDecimal creditLimit, BigDecimal apr, BigDecimal minMonthlyPayment) {
        this.accountId = accountId;
        this.userId = userId;
        this.accountName = accountName;
        this.balance = balance;
        this.accountType = accountType;
        this.creditLimit = creditLimit;
        this.apr = apr;
        this.minMonthlyPayment = minMonthlyPayment;
    }

    public Account(int accountId, User userId, String accountName, BigDecimal balance, AccountType accountType, BigDecimal creditLimit, BigDecimal apr, BigDecimal principal, LocalDate loanDisbursementDate, LocalDate loanRepaymentDate, BigDecimal minMonthlyPayment, List<Transaction> transactions) {
        this.accountId = accountId;
        this.userId = userId;
        this.accountName = accountName;
        this.balance = balance;
        this.accountType = accountType;
        this.creditLimit = creditLimit;
        this.apr = apr;
        this.principal = principal;
        this.loanDisbursementDate = loanDisbursementDate;
        this.loanRepaymentDate = loanRepaymentDate;
        this.minMonthlyPayment = minMonthlyPayment;
        this.transactions = transactions;
    }

    //Constructor for a Loan account
    public Account(int accountId, User userId, String accountName, BigDecimal balance, AccountType accountType, BigDecimal apr, BigDecimal principal, LocalDate loanDisbursementDate, LocalDate loanRepaymentDate, BigDecimal minMonthlyPayment) {
        this.accountId = accountId;
        this.userId = userId;
        this.accountName = accountName;
        this.balance = balance;
        this.accountType = accountType;
        this.apr = apr;
        this.principal = principal;
        this.loanDisbursementDate = loanDisbursementDate;
        this.loanRepaymentDate = loanRepaymentDate;
        this.minMonthlyPayment = minMonthlyPayment;
    }

    //Constructor for a Debit/Bank Deposit account


    public Account(int accountId, User userId, String accountName, BigDecimal balance, AccountType accountType, BigDecimal apr) {
        this.accountId = accountId;
        this.userId = userId;
        this.accountName = accountName;
        this.balance = balance;
        this.accountType = accountType;
        this.apr = apr;
    }

    public int getAccountId() {
        return accountId;
    }

    public void setAccountId(int accountId) {
        this.accountId = accountId;
    }

    public User getUserId() {
        return userId;
    }

    public void setUserId(User userId) {
        this.userId = userId;
    }

    public String getAccountName() {
        return accountName;
    }

    public void setAccountName(String accountName) {
        this.accountName = accountName;
    }

    public AccountType getAccountType() {
        return accountType;
    }

    public void setAccountType(AccountType accountType) {
        this.accountType = accountType;
    }

    public BigDecimal getBalance() {
        return balance;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }

    public BigDecimal getApr() {
        return apr;
    }

    public void setApr(BigDecimal apr) {
        this.apr = apr;
    }

    public BigDecimal getCreditLimit() {
        return creditLimit;
    }

    public void setCreditLimit(BigDecimal creditLimit) {
        this.creditLimit = creditLimit;
    }

    public BigDecimal getPrincipal() {
        return principal;
    }

    public void setPrincipal(BigDecimal principal) {
        this.principal = principal;
    }

    public LocalDate getLoanDisbursementDate() {
        return loanDisbursementDate;
    }

    public void setLoanDisbursementDate(LocalDate loanDisbursementDate) {
        this.loanDisbursementDate = loanDisbursementDate;
    }

    public LocalDate getLoanRepaymentDate() {
        return loanRepaymentDate;
    }

    public void setLoanRepaymentDate(LocalDate loanRepaymentDate) {
        this.loanRepaymentDate = loanRepaymentDate;
    }

    public BigDecimal getMinMonthlyPayment() {
        return minMonthlyPayment;
    }

    public void setMinMonthlyPayment(BigDecimal minMonthlyPayment) {
        this.minMonthlyPayment = minMonthlyPayment;
    }

    public List<Transaction> getTransactions() {
        return transactions;
    }

    public void setTransactions(List<Transaction> transactions) {
        this.transactions = transactions;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Account account = (Account) o;
        return accountId == account.accountId && Objects.equals(userId, account.userId) && Objects.equals(accountName, account.accountName) && Objects.equals(balance, account.balance) && accountType == account.accountType && Objects.equals(creditLimit, account.creditLimit) && Objects.equals(apr, account.apr) && Objects.equals(principal, account.principal) && Objects.equals(loanDisbursementDate, account.loanDisbursementDate) && Objects.equals(loanRepaymentDate, account.loanRepaymentDate) && Objects.equals(minMonthlyPayment, account.minMonthlyPayment);
    }

    @Override
    public int hashCode() {
        return Objects.hash(accountId, userId, accountName, balance, accountType, creditLimit, apr, principal, loanDisbursementDate, loanRepaymentDate, minMonthlyPayment);
    }

    @Override
    public String toString() {
        return "Account{" +
                "accountId=" + accountId +
                ", userId=" + userId +
                ", accountName='" + accountName + '\'' +
                ", balance=" + balance +
                ", accountType='" + accountType + '\'' +
                ", creditLimit=" + creditLimit +
                ", apr=" + apr +
                ", principal=" + principal +
                ", loanDisbursementDate=" + loanDisbursementDate +
                ", loanRepaymentDate=" + loanRepaymentDate +
                ", minMonthlyPayment=" + minMonthlyPayment +
                '}';
    }
}