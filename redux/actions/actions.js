import { SET_INBOX, SET_MESSAGES, SET_RIDER_BRANCH, SET_RIDER_ID, SET_SERVER, SET_TO_DELIVER, SET_TO_RETRIEVE } from "../types/types"; 

export const setriderid = (state = "", action) => {
    switch(action.type){
        case SET_RIDER_ID:
            return action.riderID;
        default:
            return state;
    }
}

export const setriderbranch = (state = "", action) => {
    switch(action.type){
        case SET_RIDER_BRANCH:
            return action.riderbranch;
        default:
            return state;
    }
}

export const setserver = (state = "", action) => {
    switch(action.type){
        case SET_SERVER:
            return action.server;
        default:
            return state;
    }
}

export const settoretrieve = (state = [], action) => {
    switch(action.type){
        case SET_TO_RETRIEVE:
            return action.toretrieve;
        default: 
            return state;
    }
}

export const settodeliver = (state = [], action) => {
    switch(action.type){
        case SET_TO_DELIVER:
            return action.todeliver;
        default:
            return state;
    }
}

export const setmessages = (state = [], action) => {
    switch(action.type){
        case SET_MESSAGES:
            return action.setmessages;
        default:
            return state;
    }
}

export const setinbox = (state = [], action) => {
    switch(action.type){
        case SET_INBOX:
            return action.inbox;
        default:
            return state;
    }
}