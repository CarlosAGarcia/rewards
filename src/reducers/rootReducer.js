
const initialState = {
    transactions: []
}

const rootReducer = (state = initialState, action) => {
    console.log('dispatch', { action })
    switch (action.type) {
      case 'MINED_TRANSACTION':
        return {
            ...state,
            transactions: [ ...state?.transactions, action.payload ]
        }
        case 'CLEAR_TRANSACTIONS':
            return {
                ...state,
                transactions: []
            }
      default:
        return state
    }
}

export default rootReducer