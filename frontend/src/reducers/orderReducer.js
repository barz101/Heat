const initialState = {
    currOrder: null,
    orders: []
}

export default function orderReducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'SET_ORDER':
            return {
                ...state,
                currOrder: action.order
            }
        case 'SET_ORDERS':
            return {
                ...state,
                orders: action.orders
            }
        case 'SET_ALL_ORDERS':
            return {
                ...state,
                orders: action.orders
            }
        case 'ORDER_ADD':
            return { 
                ...state, 
                orders: [...state.orders, action.orders] 
            }
        case 'REMOVE_ORDER':
            return {
                ...state,
                currOrder: action.order
            }
        default:
            return state;
    }
}
