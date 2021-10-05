
import create from 'zustand'

// combo of state vars + their accessors
export const useStore = create(set => ({
    TIME_ALIVE_IN_RENDERS: 1000,
    newTransaction: {},
    transactions: [],
    isAWSLoading: true,
    isAWSConnected: false,
    isAWSErr: null,
    isWSConnected: false,
    setWSConnection: (isWSConnected) => set(state => ({ ...state, isWSConnected, isAWSLoading: false })),
    setTimeAliveInRenders: (numOfRenders) => set(state => ({ ...state, TIME_ALIVE_IN_RENDERS: numOfRenders })),
    addTransaction: (transaction) => set(state => ({ ...state, newTransaction: transaction, transactions: [ ...state.transactions, transaction ] })),
    removeTransactionByHash: (hash) => set(state => ({ ...state, newTransaction: state.newTransaction.hash === hash ? {} : state.newTransaction, transactions: state.transactions.filter(tx => tx.hash && (tx.hash !== hash) ) })),
    lastTxClicked: null,
    transactionsClicked: [], // stores hashes to later look up in transactions
    transactionClicked: (hash) => set(state => ({ ...state, lastTxClicked: hash, transactionsClicked: state.transactionsClicked.includes(hash) ? state.transactionsClicked : [ ...state.transactionsClicked, hash ] })),
    removeTransactionClicked: (hash) => set(state => ({ ...state, lastTxClicked: hash, transactionsClicked: state.transactionsClicked.filter(txHash => txHash && (txHash !== hash)) }))
}))
