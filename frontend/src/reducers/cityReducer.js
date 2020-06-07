const initialState = {
    currCity: null,
    cities: []
}

export default function cityReducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'SET_CITIES':
            return {
                ...state,
                cities: action.cities
            }
        case 'SET_CITY':
            return {
                ...state,
                currCity: action.city
            }
        default:
            return state;
    }
}
