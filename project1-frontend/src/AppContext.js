import { createContext, useState } from "react";

const API_BASE_URL = "http://localhost:8080";

export const AppContext = createContext();

export default function AppProvider({ children }) {

const [transactions, setTransactions] = useState(["test1","test2","test3"]);

    function addTransaction(t) {
        setTransactions([...transactions, t]);
    }

    const data = {
        API_BASE_URL: API_BASE_URL,
        transactions: transactions,
        addTransaction: addTransaction
    };

    return (
        <AppContext.Provider value={data} >
            {children}
        </AppContext.Provider>
    );
};
