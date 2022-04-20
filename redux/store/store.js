import { createStore, combineReducers } from "redux";
import { setinbox, setmessages, setriderbranch, setriderid, setserver, settodeliver, settoretrieve } from "../actions/actions";

const combine = combineReducers({
    riderID: setriderid,
    server: setserver,
    toretrieve: settoretrieve,
    todeliver: settodeliver,
    riderbranch: setriderbranch,
    messages: setmessages,
    inbox: setinbox,
});

const store = createStore(combine);

export default store;