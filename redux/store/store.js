import { createStore, combineReducers } from "redux";
import { setdelivered, setinbox, setmessages, setretrieved, setriderbranch, setriderid, setserver, settodeliver, settoretrieve } from "../actions/actions";

const combine = combineReducers({
    riderID: setriderid,
    server: setserver,
    toretrieve: settoretrieve,
    todeliver: settodeliver,
    riderbranch: setriderbranch,
    messages: setmessages,
    inbox: setinbox,
    retrieved: setretrieved,
    delivered: setdelivered
});

const store = createStore(combine);

export default store;