
import create from 'zustand'

export const useStore = create(set => ({
    TIME_ALIVE_IN_RENDERS: 1000,
    setTimeAliveInRenders: (numOfRenders) => set(state => ({ ...state, TIME_ALIVE_IN_RENDERS: numOfRenders })),
    newTransaction: {},
    transactions: [],
    isAWSLoading: false,
    isAWSConnected: false,
    isAWSErr: null,
    addTransaction: (transaction) => set(state => ({ ...state, newTransaction: transaction, transactions: [ ...state.transactions, transaction ] })),
    removeTransactionByHash: (hash) => set(state => ({ ...state, newTransaction: state.newTransaction.hash === hash ? {} : state.newTransaction, transactions: state.transactions.filter(tx => tx.hash && (tx.hash !== hash) ) })),
    transactionModal: [],
    // addTransactionModal: (transaction) => set(state => ({ ...state, transactionModal })),

}))
