
const initialState = {
    // newTransaction: {},
    // transactions: [],
    // isAWSLoading: false,
    // isAWSConnected: false,
    // isAWSErr: null
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
    //     case 'AWS_CONNECTED':
    //         return {
    //             ...state,
    //             isAWSLoading: false,
    //             isAWSConnected: true,
    //             isAWSErr: null
    //         }
    //     case 'AWS_DISCONNECTED':
    //         return {
    //             ...state,
    //             isAWSLoading: false,
    //             isAWSConnected: false,
    //             isAWSErr: null
    //         }
    //     case 'AWS_ERR':
    //         return {
    //             ...state,
    //             isAWSLoading: false,
    //             isAWSConnected: false,
    //             isAWSErr: action.payload
    //         }
    //     case 'AWS_LOADING':
    //         return {
    //             ...state,
    //             isAWSLoading: true
    //         }
    //   case 'MINED_TRANSACTION':
    //     return {
    //         ...state,
    //         newTransaction: action.payload,
    //         transactions: [ ...state?.transactions, action.payload ]
    //     }
    //     case 'CLEAR_TRANSACTIONS':
    //         return {
    //             ...state,
    //             transactions: []
    //         }
      default:
        return state
    }
}

export default rootReducer