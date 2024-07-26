-- Create custom ENUM types
CREATE TYPE account_type AS ENUM('credit', 'debit', 'loan');
CREATE TYPE transaction_type AS ENUM('deposit', 'expense', 'transfer');
CREATE TYPE recurring_frequency_type AS ENUM('daily', 'weekly', 'monthly', 'quarterly', 'bi-annual', 'annual');

-- Create the Users table
CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) unique NOT NULL,
    password VARCHAR(50) NOT NULL
);

-- Create the Accounts table
CREATE TABLE Accounts (
    account_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES Users(user_id),
    account_name VARCHAR(100) NOT NULL,
    balance DECIMAL(19, 2) NOT NULL,  -- Use DECIMAL instead of money for better precision
    account_type account_type NOT NULL,
    credit_limit DECIMAL(19, 2),
    apr DECIMAL(6, 4),
    principal DECIMAL(19, 2),
    loan_disbursement_date DATE,
    loan_repayment_date DATE,
    min_monthly_payment DECIMAL(19, 2)
);

-- Create the Transactions table
CREATE TABLE Transactions (
    transaction_id SERIAL PRIMARY KEY,
    account_id INT REFERENCES Accounts(account_id),
    transaction_date DATE not null,
    amount DECIMAL(19, 2) not null,  -- Use DECIMAL instead of money for better precision
    description VARCHAR(500),
    recurring BOOLEAN,
    recurring_frequency recurring_frequency_type,
    transaction_type transaction_type not null,
    related_transaction_id INT REFERENCES Transactions(transaction_id)
);
