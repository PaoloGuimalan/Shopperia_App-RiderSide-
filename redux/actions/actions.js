import { SET_RIDER_ID } from "../types/types"; 

export const setriderid = (state = "", action) => {
    switch(action.type){
        case SET_RIDER_ID:
            return action.riderID;
        default:
            return state;
    }
}