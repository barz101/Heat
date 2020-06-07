const initialState = {
    currProduct: null,
    products: []
}

export default function productReducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'SET_PRODUCT':
            return {
                ...state,
                currProduct: action.product
            }
        case 'SET_PRODUCTS':
            return {
                ...state,
                products: action.products
            }
        case 'SET_ALL_PRODUCTS':
            return {
                ...state,
                products: action.products
            }
        case 'REMOVE_PRODUCT':
            return {
                ...state,
                currProduct: action.product
            }
        case 'UPDATE_PRODUCT':
            return {
                ...state,
                products: state.products.map(product => {
                    if (product._id === action.product._id) return action.product;
                    return product;
                })
            }
        default:
            return state;
    }
}
