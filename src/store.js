
import create from 'zustand'

export const useStore = create(set => ({
    newTransaction: {},
    transactions: [1, 2 ],
    isAWSLoading: false,
    isAWSConnected: false,
    isAWSErr: null,
    addTransaction: (transaction) => set(state => ({ ...state, newTransaction: transaction, transactions: [ ...state.transactions, transaction ] })),
    
    increasePopulation: () => set(state => ({ bears: state.bears + 1 })),
    removeAllBears: () => set({ bears: 0 })
}))
