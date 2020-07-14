import { SHOW, HIDE } from "../types"

export const AlertReducer = (state, action) => {
    switch(action.type) {
        case SHOW:
            return {
                ...action.payload,
                visible: true
            }

        case HIDE:
            return {
                ...state,
                visible: false
            }

        default:
            return state
    }
}